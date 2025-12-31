import reducer, {
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveIngredient
} from './constructorSlice';
import { TIngredient } from '../../utils/types';

// 1. Мокаем uuid, чтобы тесты были детерминированными
jest.mock('uuid', () => ({
  v4: () => 'test-uuid-123'
}));

describe('burgerConstructor slice reducer', () => {
  const mockBun: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const mockIngredient: TIngredient = {
    _id: '2',
    name: 'Начинка',
    type: 'main',
    proteins: 20,
    fat: 20,
    carbohydrates: 20,
    calories: 200,
    price: 200,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const initialState = {
    bun: null,
    ingredients: []
  };

  // Тест инициализации
  it('должен возвращать начальное состояние при неизвестном экшене', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  // Тест добавления (addIngredient)
  describe('экшен addIngredient', () => {
    it('должен корректно добавлять булку', () => {
      const state = reducer(initialState, addIngredient(mockBun));
      expect(state.bun).toEqual({ ...mockBun, id: 'test-uuid-123' });
    });

    it('должен корректно добавлять основной ингредиент в массив', () => {
      const state = reducer(initialState, addIngredient(mockIngredient));
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual({
        ...mockIngredient,
        id: 'test-uuid-123'
      });
    });
  });

  // Тест удаления (removeIngredient)
  it('должен удалять ингредиент из массива по id', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...mockIngredient, id: 'to-be-deleted' }]
    };
    const state = reducer(
      stateWithIngredient,
      removeIngredient('to-be-deleted')
    );
    expect(state.ingredients).toHaveLength(0);
  });

  // Тест изменения порядка (moveIngredient)
  it('должен изменять порядок ингредиентов в массиве', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: '1', name: 'Первый' },
        { ...mockIngredient, id: '2', name: 'Второй' }
      ]
    };
    // Перемещаем с индекса 0 на индекс 1
    const state = reducer(
      stateWithIngredients,
      moveIngredient({ from: 0, to: 1 })
    );
    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Первый');
  });

  // Тест сброса конструктора (resetConstructor)
  it('должен полностью очищать конструктор', () => {
    const dirtyState = {
      bun: { ...mockBun, id: '1' },
      ingredients: [{ ...mockIngredient, id: '2' }]
    };
    const state = reducer(dirtyState, resetConstructor());
    expect(state).toEqual(initialState);
  });
});
