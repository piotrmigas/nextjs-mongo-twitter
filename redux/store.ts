import { configureStore } from '@reduxjs/toolkit';
import registerModalReducer from './slices/registerModalslice';
import loginModalReducer from './slices/loginModalSlice';
import editModalReducer from './slices/editModalSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    registerModal: registerModalReducer,
    loginModal: loginModalReducer,
    editModal: editModalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
