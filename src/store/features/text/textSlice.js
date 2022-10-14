import { createSlice } from '@reduxjs/toolkit';

const initialTextState = {
  text: '',
  undoStack: [],
  redoStack: [],
};

const textSlice = createSlice({
  name: 'text',
  initialState: initialTextState,
  reducers: {
    undo(state, action) {
      state.redoStack.push(state.text);
      state.text = state.undoStack.pop();
    },
    redo(state, action) {
      state.undoStack.push(state.text);
      state.text = state.redoStack.pop();
    },
    exec(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      state.text = action.payload.text;
    },
    updateText(state, action) {
      state.text = action.payload.text;
    },
  },
});

export default textSlice.reducer;
export const textActions = textSlice.actions;
