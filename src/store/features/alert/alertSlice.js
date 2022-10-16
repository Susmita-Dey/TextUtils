import { createSlice } from '@reduxjs/toolkit';
import { textActions } from '../text/textSlice';

const initialAlertState = {
  type: '',
  message: '',
  show: true,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    setAlert(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    removeAlert(state, action) {
      state = initialAlertState;
    },
  },
});

export default alertSlice.reducer;
export const alertActions = alertSlice.actions;
