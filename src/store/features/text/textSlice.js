import { createSlice } from '@reduxjs/toolkit';
import { Buffer } from 'buffer';

const initialTextState = {
  text: '',
  undoStack: [],
  redoStack: [],
};

const BASE64 = 'base64';

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
    // exec(state, action) {
    //   state.redoStack = [];
    //   state.undoStack.push(state.text);
    //   state.text = action.payload.text;
    // },
    updateText(state, action) {
      state.text = action.payload.text;
    },
    base64(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      state.text = Buffer.from(state.text).toString(BASE64);
    },
    upperCase(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      state.text = state.text.toUpperCase();
    },
    lowerCase(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      state.text = state.text.toLowerCase();
    },
    sentenceCase(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      const words = state.text.toLowerCase().split(' ');
      const sentenceCased = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      state.text = sentenceCased.join(' ');
    },
    clear(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      state.text = '';
    },
    removeWhiteSpace(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      let result = '';

      for (let i = 0; i < state.text.length - 1; i++) {
        if (state.text[i] == ' ' && state.text[i + 1] == ' ') continue;
        else result += state.text[i];
      }
      if (state.text[state.text.length - 1] != ' ')
        result += state.text[state.text.length - 1];

      state.text = result;
    },
    removeSpecialCharacters(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      state.text = state.text.replace(/[^a-zA-Z0-9 ]/g, '');
    },
    // Handle props better
    extractText(state, action) {
      const letters = state.text.match(/[a-z]|[A-Z]/g);
      if (letters === null)
        action.payload.props.showAlert('No words found in the text', 'warning');
      state.text = letters.join('');
      action.payload.props.showAlert(
        'Extracted the words from the text',
        'success'
      );
    },
    // Handle props better
    extractNumbers(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      const digits = state.text.match(/[0-9]/g);
      if (digits === null)
        action.payload.props.showAlert('No number found', 'warning');
      state.text = digits.join('');
      action.payload.props.showAlert(
        'Extracted the Numbers from the text',
        'success'
      );
    },
    // Handle props better
    extractLink(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      const link = state.text.match(
        /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
      );

      if (link === null)
        action.payload.props.showAlert('No link found', 'warning');
      state.text = link.join('');
      action.payload.props.showAlert(
        'Extracted the Links from the text',
        'success'
      );
    },
    reverseText(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      const words = state.text.split(' ');
      let i = 0;
      let result = '';

      for (i = 0; i < words.length; i++)
        result = words[i].split('').reverse().join('') + ' ' + result;

      state.text = result;
    },
    replaceText(state, action) {
      state.redoStack = [];
      state.undoStack.push(state.text);
      state.text = state.text.split(action.word).join(action.newWord);
    },
  },
});

export default textSlice.reducer;
export const textActions = textSlice.actions;
