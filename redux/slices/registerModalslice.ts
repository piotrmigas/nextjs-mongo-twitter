import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface RegisterModalState {
  isOpen: boolean;
}

const initialState: RegisterModalState = {
  isOpen: false,
};

export const slice = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {
    openRegisterModal: (state) => {
      state.isOpen = true;
    },
    closeRegisterModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openRegisterModal, closeRegisterModal } = slice.actions;

export const selectIsOpen = (state: RootState) => state.registerModal.isOpen;

export default slice.reducer;
