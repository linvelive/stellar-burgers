import { rootReducer } from './store';
import { Action } from 'redux';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    // Вызываем редьюсер с undefined и "пустым" экшеном
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Проверяем, что в итоговом стейте есть ключи всех наших слайсов
    expect(state.ingredients).toBeDefined();
    expect(state.burgerConstructor).toBeDefined();
    expect(state.user).toBeDefined();
    expect(state.feed).toBeDefined();
    expect(state.orders).toBeDefined();
    expect(state.newOrder).toBeDefined();

    // Также можно проверить, что данные в них соответствуют начальным
    expect(state.ingredients.ingredients).toEqual([]);
    expect(state.burgerConstructor.ingredients).toEqual([]);
  });
});
