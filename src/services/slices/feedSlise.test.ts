import reducer, { getFeeds, initialState } from './feedSlice';

describe('feedSlice extraReducers', () => {
  const mockFeedResponse = {
    success: true,
    orders: [
      {
        _id: '1',
        status: 'done',
        name: 'Burger 1',
        createdAt: '2023-05-04T12:00:00.000Z',
        updatedAt: '2023-05-04T12:05:00.000Z',
        number: 111,
        ingredients: ['1', '2']
      }
    ],
    total: 1000,
    totalToday: 10
  };

  it('должен устанавливать isLoading: true при getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные ленты при getFeeds.fulfilled', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockFeedResponse
    };
    const state = reducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockFeedResponse.orders);
    expect(state.total).toBe(mockFeedResponse.total);
    expect(state.totalToday).toBe(mockFeedResponse.totalToday);
  });

  it('должен записывать ошибку при getFeeds.rejected', () => {
    const error = 'Failed to fetch feeds';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: error }
    };
    const state = reducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
