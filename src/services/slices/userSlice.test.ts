import reducer, {
  registerUser,
  loginUser,
  checkUserAuth,
  logoutUser,
  updateUser,
  authChecked
} from './userSlice';

describe('userSlice reducer', () => {
  const initialState = {
    isAuthChecked: false,
    user: null,
    error: null
  };

  const mockUser = {
    email: 'test@test.com',
    name: 'Ivan Ivanov'
  };

  // 1. Тест синхронного редьюсера
  it('должен устанавливать isAuthChecked: true при вызове authChecked', () => {
    const state = reducer(initialState, authChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  // 2. Тесты авторизации (Login/Register)
  describe('Login & Register', () => {
    it('должен сохранять пользователя при loginUser.fulfilled', () => {
      const action = { type: loginUser.fulfilled.type, payload: mockUser };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять пользователя при registerUser.fulfilled', () => {
      const action = { type: registerUser.fulfilled.type, payload: mockUser };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен записывать ошибку при loginUser.rejected', () => {
      const error = 'Login failed';
      const action = {
        type: loginUser.rejected.type,
        error: { message: error }
      };
      const state = reducer(initialState, action);
      expect(state.error).toBe(error);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  // 3. Тесты проверки авторизации (Check Auth)
  describe('checkUserAuth', () => {
    it('должен сохранять пользователя при checkUserAuth.fulfilled', () => {
      const action = { type: checkUserAuth.fulfilled.type, payload: mockUser };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен сбрасывать пользователя при checkUserAuth.rejected', () => {
      const stateWithUser = { ...initialState, user: mockUser };
      const action = { type: checkUserAuth.rejected.type };
      const state = reducer(stateWithUser, action);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });
  });

  // 4. Тесты логаута и обновления
  it('должен удалять пользователя при logoutUser.fulfilled', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const action = { type: logoutUser.fulfilled.type };
    const state = reducer(stateWithUser, action);
    expect(state.user).toBeNull();
  });

  it('должен обновлять данные пользователя при updateUser.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'New Name' };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = reducer({ ...initialState, user: mockUser }, action);
    expect(state.user?.name).toBe('New Name');
  });
});
