/// <reference types="cypress" />

describe('Auth form errors', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    });
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });

  it('shows the server message after a failed login and hides it on retry', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 401,
      body: { success: false, message: 'email or password is incorrect' }
    }).as('login');

    cy.visit('/login');
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('wrong-password');
    cy.get('form[name=login] button[type=submit]').click();
    cy.wait('@login');

    cy.contains('email or password is incorrect').should('be.visible');

    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 401,
      body: { success: false, message: 'email or password is incorrect' },
      delay: 500
    }).as('retry');
    cy.get('form[name=login] button[type=submit]').click();
    cy.contains('email or password is incorrect').should('not.exist');
    cy.wait('@retry');
    cy.contains('email or password is incorrect').should('be.visible');
  });

  it('shows a fallback when the server answers without a JSON body', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 502,
      headers: { 'content-type': 'text/html' },
      body: '<html>Bad Gateway</html>'
    }).as('login');

    cy.visit('/login');
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('any-password');
    cy.get('form[name=login] button[type=submit]').click();
    cy.wait('@login');

    cy.contains('Login failed').should('be.visible');
  });

  it('shows the server message after a failed registration', () => {
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 409,
      body: { success: false, message: 'User already exists' }
    }).as('register');

    cy.visit('/register');
    cy.get('input[name=name]').type('Test User');
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('password123');
    cy.get('form[name=register] button[type=submit]').click();
    cy.wait('@register');

    cy.contains('User already exists').should('be.visible');
  });
});
