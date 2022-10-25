import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { textActions } from '../store/features/text/textSlice';
import Button from './ui/Button';

export default function TextForm(props) {
  const [isListening, setIsListening] = useState(false);

  /**
   * Get the state of text from the redux store using useSelector
   */
  const textState = useSelector((state) => state.text);
  const themeState = useSelector((state) => state.theme);
  /**
   * dispatch function to invoke actions on the state
   */
  const dispatch = useDispatch();

  /**
   * Dispatch to undo text action
   */
  const handleUndo = () => dispatch(textActions.undo());

  /**
   * Dispatch to redo text action
   */
  const handleRedo = () => dispatch(textActions.redo());

  /**
   * Converts the text to base64
   */
  const handlebase64Click = () => {
    dispatch(textActions.base64());
  };

  /**
   * Converts the text to uppercase
   */
  const handleUpClick = () => {
    dispatch(textActions.upperCase());
  };

  /**
   * Converts the text to lowercase
   */
  const handleLowClick = () => {
    dispatch(textActions.lowerCase());
  };

  /**
   * Converts the text to sentancecase.
   */
  const handleSentenceClick = () => {
    dispatch(textActions.sentenceCase());
  };

  /**
   * Clears the text
   */
  const handleClearClick = () => {
    if (!window.confirm('Do you want to delete the text')) return;
    dispatch(textActions.clear());
  };

  /**
   * Invoke speech from text
   * TODO: Can better modify the function
   */
  const handleSpeakClick = (event) => {
    let el = event.currentTarget;
    if (el.innerHTML === 'Listen Now') el.innerHTML = 'Stop Now';
    else el.innerHTML = 'Listen Now';

    // el.innerHTML has already been changed here, hence checking for the opposite value
    if (el.innerHTML === 'Stop Now') {
      let msg = new SpeechSynthesisUtterance();
      msg.text = textState.text;
      window.speechSynthesis.speak(msg);
    } else {
      let msg = new SpeechSynthesisUtterance();
      msg.text = textState.text;
      window.speechSynthesis.cancel(msg);
    }
  };

  /**
   * Copies to clipboard
   */
  const handleCopyClick = () => {
    navigator.clipboard.writeText(textState.text);
  };

  /**
   * Removes white space from the text
   */
  const handleRemoveWhiteSpaceClick = () => {
    dispatch(textActions.removeWhiteSpace());
  };

  /**
   * Removes special characters from the text
   */
  const handleRemoveSpecialCharacters = () => {
    dispatch(textActions.removeSpecialCharacters());
  };

  /**
   * Update the text on every keystroke
   * TODO: Optimize
   */
  const handleOnChange = (event) =>
    dispatch(textActions.updateText({ text: event.target.value }));

  /**
   * Extracts the words from the text
   */
  const handletextExtract = () => {
    dispatch(textActions.extractText());
  };

  /**
   * Extract the numbers from the text
   */
  const handleNumExtract = () => {
    dispatch(textActions.extractNumbers());
  };

  /**
   * Extract the link from the text
   */
  const handleLinkExtract = () => {
    dispatch(textActions.extractLink());
  };

  /**
   * Reverses the text
   */
  const handlereverseClick = () => {
    dispatch(textActions.reverseText());
  };

  //speech

  let mic;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    mic = new SpeechRecognition();
    mic.continuous = true;
    mic.interimResults = true;
    mic.lang = 'en-US';
  }

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (!mic) {
      return;
    }
    if (isListening) {
      mic.start();
      console.log('start');
    } else {
      mic.stop();
      console.log('stopeed');
    }
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      dispatch(textActions.updateText({ text: textState.text + transcript }));
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  /**
   * Replace the word with given prompt
   */
  const replace = () => {
    const word = prompt('Enter the string to replace.');
    const newWord = prompt('Enter the string to replace with.');
    dispatch(textActions.replaceText({ word, newWord }));
  };

  const availableActions = [
    {
      label: 'Convert to uppercase',
      handleOnClick: handleUpClick,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Convert to lowercase',
      handleOnClick: handleLowClick,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Convert to sentencecase',
      handleOnClick: handleSentenceClick,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Encode to base64',
      handleOnClick: handlebase64Click,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Clear Text',
      handleOnClick: handleClearClick,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Extract Numbers',
      handleOnClick: handleNumExtract,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Extract Links',
      handleOnClick: handleLinkExtract,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Extract text',
      handleOnClick: handletextExtract,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Listen now',
      handleOnClick: handleSpeakClick,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Remove white space',
      handleOnClick: handleRemoveWhiteSpaceClick,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Remove Special Characters',
      handleOnClick: handleRemoveSpecialCharacters,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Copy to clipboard',
      handleOnClick: handleCopyClick,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Reverse text',
      handleOnClick: handlereverseClick,
      disabled: textState.text.length === 0,
    },
    {
      label: isListening ? 'Stop Listening' : 'Start Listening',
      handleOnClick: () => setIsListening((prevState) => !prevState),
      supported: !mic,
    },
    {
      label: 'Change text',
      handleOnClick: replace,
      disabled: textState.text.length === 0,
    },
    {
      label: 'Undo Action',
      handleOnClick: handleUndo,
      disabled: textState.undoStack.length === 0,
    },
    {
      label: 'Redo Action',
      handleOnClick: handleRedo,
      disabled: textState.redoStack.length === 0,
    },
  ];

  return (
    <>
      <div
        className="container"
        style={{
          color: themeState.color,
        }}
      >
        <h1 className="mb-2">Enter The Text To Analyze Below</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={textState.text}
            onChange={handleOnChange}
            style={{
              backgroundColor: themeState.backgroundColor,
              color: themeState.color,
            }}
          ></textarea>
        </div>
        {availableActions.map((action) => {
          const supported = action?.supported ? true : false;

          if (supported) {
            return;
          }

          return <Button key={action.label} action={action} />;
        })}
      </div>
      <div
        className="container my-3"
        style={{
          color: themeState.color,
        }}
      >
        <h2>Your Text Summary</h2>
        <p>
          <b>
            {
              textState.text
                .replace(/\s/)
                .split(' ')
                .filter((value) => value !== '').length
            }
          </b>{' '}
          words,
          <b> {textState.text.trim().length}</b> characters,
          <b>
            {' '}
            {
              textState.text
                .replace(/\n/g, '.')
                .split('.')
                .filter((value) => value !== '').length
            }
          </b>{' '}
          statements,
          <b> {textState.text.split('?').length - 1}</b> questions,{' '}
          <b>{textState.text.split('!').length - 1}</b> exclamations.
        </p>
        <p>
          {0.08 *
            textState.text.split(' ').filter((element) => {
              return element.length !== 0;
            }).length}{' '}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p>
          {textState.text.length > 0 ? textState.text : 'Nothing to preview!!'}
        </p>
      </div>
    </>
  );
}
