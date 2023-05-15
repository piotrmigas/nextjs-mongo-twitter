import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LoginModalState {
  isOpen: boolean;
}

const initialState: LoginModalState = {
  isOpen: false,
};

export const slice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isOpen = true;
    },
    closeLoginModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal } = slice.actions;

export const selectIsOpen = (state: RootState) => state.loginModal.isOpen;

export default slice.reducer;
