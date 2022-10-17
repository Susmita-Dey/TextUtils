import { createSlice } from '@reduxjs/toolkit';
import { Buffer } from 'buffer';

const initialTextState = {
  text: '',
  undoStack: [],
  redoStack: [],
  status: 'pending',
};

const BASE64 = 'base64';

const textSlice = createSlice({
  name: 'text',
  initialState: initialTextState,
  reducers: {
    undo(state, action) {
      state.redoStack.push(state.text);
      state.text = state.undoStack.pop();
      state.status = 'success';
    },
    redo(state, action) {
      state.undoStack.push(state.text);
      state.text = state.redoStack.pop();
      state.status = 'success';
    },
    exec(state, action) {
      state.redoStack = [];
      state.undoStack.push(action.payload.prevText);
    },
    updateText(state, action) {
      state.text = action.payload.text;
      state.status = 'pending';
    },
    base64(state, action) {
      state.text = Buffer.from(state.text).toString(BASE64);
      state.status = 'success';
    },
    upperCase(state, action) {
      state.text = state.text.toUpperCase();
      state.status = 'success';
    },
    lowerCase(state, action) {
      state.text = state.text.toLowerCase();
      state.status = 'success';
    },
    sentenceCase(state, action) {
      const words = state.text.toLowerCase().split(' ');
      const sentenceCased = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      state.text = sentenceCased.join(' ');
      state.status = 'success';
    },
    clear(state, action) {
      state.text = '';
      state.status = 'success';
    },
    removeWhiteSpace(state, action) {
      let result = '';

      for (let i = 0; i < state.text.length - 1; i++) {
        if (state.text[i] == ' ' && state.text[i + 1] == ' ') continue;
        else result += state.text[i];
      }
      if (state.text[state.text.length - 1] != ' ')
        result += state.text[state.text.length - 1];

      state.text = result;
      state.status = 'success';
    },
    removeSpecialCharacters(state, action) {
      state.text = state.text.replace(/[^a-zA-Z0-9 ]/g, '');
    },
    extractText(state, action) {
      const letters = state.text.match(/[a-z]|[A-Z]/g);
      if (letters === null) {
        state.text = '';
        state.status = 'warning';
      } else {
        state.text = letters.join('');
        state.status = 'success';
      }
    },
    extractNumbers(state, action) {
      const digits = state.text.match(/[0-9]/g);
      if (digits === null) {
        state.text = '';
        state.status = 'warning';
      } else {
        state.text = digits.join('');
        state.status = 'success';
      }
    },
    extractLink(state, action) {
      const link = state.text.match(
        /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
      );
      if (link === null) {
        state.text = '';
        state.status = 'warning';
      } else {
        state.text = link.join('');
        state.status = 'success';
      }
    },
    reverseText(state, action) {
      const words = state.text.split(' ');
      let i = 0;
      let result = '';

      for (i = 0; i < words.length; i++)
        result = words[i].split('').reverse().join('') + ' ' + result;

      state.text = result;
      state.status = 'success';
    },
    replaceText(state, action) {
      state.text = state.text
        .split(action.payload.word)
        .join(action.payload.newWord);
      state.status = 'success';
    },
  },
});

export default textSlice.reducer;
export const textActions = textSlice.actions;
