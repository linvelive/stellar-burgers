import reducer, { fetchOrders } from './ordersSlice';

describe('ordersSlice extraReducers', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  };

  const mockOrders = [
    {
      _id: '1',
      status: 'done',
      name: 'Бессмертный бургер',
      createdAt: '2023-05-04T12:00:00.000Z',
      updatedAt: '2023-05-04T12:05:00.000Z',
      number: 777,
      ingredients: ['1', '2']
    }
  ];

  it('должен устанавливать isLoading: true при fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен записывать заказы и устанавливать isLoading: false при fetchOrders.fulfilled', () => {
    const action = {
      type: fetchOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = reducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('должен записывать ошибку и устанавливать isLoading: false при fetchOrders.rejected', () => {
    const error = 'Failed to fetch orders';
    const action = {
      type: fetchOrders.rejected.type,
      error: { message: error }
    };
    const state = reducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
