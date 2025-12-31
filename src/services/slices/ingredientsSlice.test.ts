import reducer, { getIngredients } from './ingredientsSlice';

describe('ingredientsSlice extraReducers', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const mockIngredients = [
    {
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
    }
  ];

  // 1. Тест для состояния ожидания (Request / Pending)
  it('должен устанавливать loading: true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  // 2. Тест для успешного ответа (Success / Fulfilled)
  it('должен записывать ингредиенты и устанавливать loading: false при getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  // 3. Тест для ошибки (Failed / Rejected)
  it('должен записывать ошибку и устанавливать loading: false при getIngredients.rejected', () => {
    const error = 'Failed to fetch ingredients';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: error }
    };
    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
