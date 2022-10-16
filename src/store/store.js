import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import textReducer, { textActions } from './features/text/textSlice';
import themeReducer from './features/theme/themeSlice';
import alertReducer, { alertActions } from './features/alert/alertSlice';
import messages from './alertMessages.json';

const textListenerMiddleware = createListenerMiddleware();
const alertListenerMiddleware = createListenerMiddleware();

textListenerMiddleware.startListening({
  predicate(action, currState, nextState) {
    if (
      action.type === 'text/exec' ||
      action.type === 'text/undo' ||
      action.type === 'text/redo' ||
      action.type === 'text/updateText' ||
      action.type.search('alert/') !== -1
    )
      return false;
    else return true;
  },
  effect(action, listenerApi) {
    console.log(2);
    listenerApi.dispatch(
      textActions.exec({ prevText: listenerApi.getOriginalState().text.text })
    );
  },
});

alertListenerMiddleware.startListening({
  predicate(action, currState, nextState) {
    if (
      action.type === 'text/exec' ||
      action.type === 'text/undo' ||
      action.type === 'text/redo' ||
      action.type === 'text/updateText' ||
      action.type.search('alert/') !== -1
    )
      return false;
    else return true;
  },
  effect(action, listenerApi) {
    const type = listenerApi.getState().text.status;
    const message = messages[action.type][type];
    listenerApi.dispatch(
      alertActions.setAlert({
        message,
        type,
      })
    );
  },
});

// Store configuration
const store = configureStore({
  reducer: {
    text: textReducer,
    theme: themeReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      alertListenerMiddleware.middleware,
      textListenerMiddleware.middleware,
    ]),
});

store.subscribe(() => console.log(store.getState()));

export default store;
