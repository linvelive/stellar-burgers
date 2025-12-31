import reducer, { orderBurger, resetOrder } from './newOrderSlice';

describe('newOrderSlice extraReducers', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  const mockOrder = {
    _id: '643d69a5c3f7b9001cfa0945',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2023-05-04T12:00:00.000Z',
    updatedAt: '2023-05-04T12:05:00.000Z',
    number: 12345,
    ingredients: ['643d69a5c3f7b9001cfa093c']
  };

  // 1. Тест для состояния ожидания (pending)
  it('должен устанавливать orderRequest: true при orderBurger.pending', () => {
    const action = { type: orderBurger.pending.type };
    const state = reducer(initialState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBe(null);
  });

  // 2. Тест для успешного ответа (fulfilled)
  it('должен записывать данные заказа и устанавливать orderRequest: false при orderBurger.fulfilled', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: mockOrder
    };
    const state = reducer({ ...initialState, orderRequest: true }, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  // 3. Тест для ошибки (rejected)
  it('должен записывать ошибку и устанавливать orderRequest: false при orderBurger.rejected', () => {
    const error = 'Order failed';
    const action = {
      type: orderBurger.rejected.type,
      error: { message: error }
    };
    const state = reducer({ ...initialState, orderRequest: true }, action);

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(error);
  });

  // 4. Тест синхронного экшена resetOrder
  it('должен очищать данные заказа при вызове resetOrder', () => {
    const stateWithOrder = {
      orderRequest: false,
      orderModalData: mockOrder,
      error: null
    };
    const state = reducer(stateWithOrder, resetOrder());

    expect(state.orderModalData).toBeNull();
  });
});
