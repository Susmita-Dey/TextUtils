import { createSlice } from '@reduxjs/toolkit';

const initialAlertState = {
  type: '',
  message: '',
  show: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    setAlert(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.show = true;
    },
    removeAlert(state, action) {
      state.type = '';
      state.message = '';
      state.show = false;
    },
  },
});

export default alertSlice.reducer;
export const alertActions = alertSlice.actions;
