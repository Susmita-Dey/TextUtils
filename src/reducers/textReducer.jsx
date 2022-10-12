export const initialTextState = {
  text: '',
  undoStack: [],
  redoStack: [],
};

export const textReducer = (state, action) => {
  switch (action.type) {
    case 'undo': {
      const redoStack = state.redoStack;
      redoStack.push(state.text);

      const undoStack = state.undoStack;
      const text = undoStack.pop();

      return { text, redoStack, undoStack };
    }
    case 'redo': {
      const redoStack = state.redoStack;
      const undoStack = state.undoStack;
      undoStack.push(state.text);
      const text = redoStack.pop();

      return { text, undoStack, redoStack };
    }
    case 'exec': {
      const redoStack = [];
      const undoStack = state.undoStack;
      undoStack.push(state.text);
      const text = action.payload.text;

      return { text, undoStack, redoStack };
    }
    default:
      return initialTextState;
  }
};
