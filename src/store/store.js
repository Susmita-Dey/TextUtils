import { configureStore } from '@reduxjs/toolkit';
import textReducer from './features/text/textSlice';
import themeReducer from './features/theme/themeSlice';

// Store configuration
const store = configureStore({
  reducer: {
    text: textReducer,
    theme: themeReducer,
  },
});

export default store;
