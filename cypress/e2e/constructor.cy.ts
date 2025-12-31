/// <reference types="cypress" />

describe('Проверка работы конструктора бургера', () => {
  // Селекторы на основе твоих данных
  const INGREDIENT_BUN = '[data-testid="643d69a5c3f7b9001cfa093c"]';
  const INGREDIENT_MAIN = '[data-testid="643d69a5c3f7b9001cfa0941"]';
  const MODAL = '[data-testid="modal"]';
  const CLOSE_BUTTON = '[data-testid="modal-close-button"]';
  const ORDER_BUTTON = '[data-testid="order-button"]';

  beforeEach(() => {
    // Используем маски **/ для перехвата запросов к любому домену
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    // Настройка авторизации
    window.localStorage.setItem('refreshToken', 'fake-refresh-token');
    cy.setCookie('accessToken', 'fake-access-token');

    cy.visit('/');
    // Ждем загрузки ингредиентов, чтобы страница успела отрисоваться
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });

  it('должен добавлять булки и ингредиенты в конструктор', () => {
    // Кликаем именно по кнопке "Добавить" внутри li
    cy.get(INGREDIENT_BUN).find('button').contains('Добавить').click();
    cy.get(INGREDIENT_MAIN).find('button').contains('Добавить').click();

    // Проверяем наличие в конструкторе
    cy.get('.constructor-element_pos_top').should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get('.constructor-element_pos_bottom').should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get('.constructor-element').should(
      'contain',
      'Биокотлета из марсианской мамонтятины'
    );
  });

  describe('Работа модальных окон', () => {
    it('должно открываться и закрываться модальное окно ингредиента', function () {
      cy.get(INGREDIENT_BUN).find('a').click();

      cy.get(MODAL).should('exist');
      // Ищем текст в любом месте внутри модалки
      cy.contains('Детали ингредиента').should('be.visible');

      cy.get(CLOSE_BUTTON).click();
      cy.get(MODAL).should('not.exist');
    });

    it('должно закрываться по клику на оверлей', () => {
      cy.get(INGREDIENT_BUN).find('a').click();
      // force: true позволяет кликнуть, даже если Cypress считает элемент перекрытым
      cy.get('[data-testid="overlay"]').click({ force: true });
      cy.get(MODAL).should('not.exist');
    });
  });

  it('должен оформлять заказ и очищать конструктор', () => {
    // Собираем бургер
    cy.get(INGREDIENT_BUN).find('button').click();
    cy.get(INGREDIENT_MAIN).find('button').click();

    // Клик по кнопке оформления (убедись, что добавил data-testid="order-button")
    cy.get(ORDER_BUTTON).click();

    // Проверяем модалку заказа и номер из фикстуры order.json
    cy.get(MODAL).should('exist');
    cy.get('[data-testid="order-number"]').should('contain', '12345');

    // Закрываем модалку
    cy.get(CLOSE_BUTTON).click();
    cy.get(MODAL).should('not.exist');

    // Проверяем, что конструктор пуст
    cy.get('.constructor-element').should('not.exist');
  });
});
