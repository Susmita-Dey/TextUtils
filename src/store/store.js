import { configureStore } from '@reduxjs/toolkit';
import textReducer from './features/text/textSlice';

// Store configuration
const store = configureStore({
  reducer: {
    text: textReducer,
  },
});

export default store;
