// components/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Reducers
import themeReducer from '../features/theme/themeSlice';
import authReducer from './store/authSlice';
import userListReducer from './store/userListSlice';

// Root saga
import rootSaga from './store/rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store with reducers and middleware
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userListReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
