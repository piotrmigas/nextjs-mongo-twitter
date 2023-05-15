import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface EditModalState {
  isOpen: boolean;
}

const initialState: EditModalState = {
  isOpen: false,
};

export const slice = createSlice({
  name: 'editModal',
  initialState,
  reducers: {
    openEditModal: (state) => {
      state.isOpen = true;
    },
    closeEditModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openEditModal, closeEditModal } = slice.actions;

export const selectIsOpen = (state: RootState) => state.editModal.isOpen;

export default slice.reducer;
