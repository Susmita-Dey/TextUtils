import { useReducer } from 'react';

const initialState = {
  text: '',
  undoStack: [],
  redoStack: [],
};

const textReducer = (state, action) => {
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
      return initialState;
  }
};

function TextTest() {
  const [text, dispatchText] = useReducer(textReducer, initialState);
  console.log(text);

  const handleGenerate = () => {
    dispatchText({ type: 'exec' });
  };

  const handleUndo = () => {
    dispatchText({ type: 'undo' });
  };

  const handleRedo = () => {
    dispatchText({ type: 'redo' });
  };

  return (
    <div>
      <div>{text.count}</div>
      <button onClick={() => handleGenerate()}>Generate {text.count}</button>
      <button
        onClick={() => handleUndo()}
        disabled={text.undoStack.length === 0}
      >
        Undo
      </button>
      <button
        onClick={() => handleRedo()}
        disabled={text.redoStack.length === 0}
      >
        Redo
      </button>
    </div>
  );
}

export default TextTest;
