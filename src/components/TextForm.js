import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { useSelector, useDispatch } from 'react-redux';

import { textActions } from '../store/features/text/textSlice';

export default function TextForm(props) {
  const [isListening, setIsListening] = useState(false);

  /**
   * Get the state of text from the redux store using useSelector
   */
  const textState = useSelector((state) => state.text);
  /**
   * dispatch function to invoke actions on the state
   */
  const dispatch = useDispatch();

  console.log(textState);

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
    const result = Buffer.from(textState.text).toString('base64');
    dispatch(textActions.exec({ text: result }));
    props.showAlert('Converted to Base64 encoding', 'success');
  };

  /**
   * Converts the text to uppercase
   */
  const handleUpClick = () => {
    const result = textState.text.toUpperCase();
    dispatch(textActions.exec({ text: result }));
    props.showAlert(
      'Con dispatch(textActions.exec({ text: encodedData }));verted to uppercase',
      'success'
    );
  };

  /**
   * Converts the text to lowercase
   */
  const handleLowClick = () => {
    const result = textState.text.toLowerCase();
    dispatch(textActions.exec({ text: result }));
    props.showAlert('Converted to lowercase', 'success');
  };

  /**
   * Converts the text to sentancecase.
   */
  const handleSentenceClick = () => {
    const resultArray = textState.text.toLowerCase().split(' ');
    for (var i = 0; i < resultArray.length; i++)
      resultArray[i] =
        resultArray[i].charAt(0).toUpperCase() + resultArray[i].slice(1);
    const result = resultArray.join(' ');
    dispatch(textActions.exec({ text: result }));
    props.showAlert('Converted to Sentencecase', 'success');
  };

  /**
   * Clears the text
   */
  const handleClearClick = () => {
    if (window.confirm('Do you want to delete the text')) {
      const result = '';
      dispatch(textActions.exec({ text: result }));
      props.showAlert('Text has been cleared', 'success');
    }
  };

  /**
   * Invoke speech from text
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
    props.showAlert('Text has been copied to clipboard', 'success');
  };

  /**
   * Removes white space from the text
   */
  const handleRemoveWhiteSpaceClick = () => {
    let result = '';
    for (let i = 0; i < textState.text.length - 1; i++) {
      if (textState.text[i] == ' ' && textState.text[i + 1] == ' ') continue;
      else result += textState.text[i];
    }
    if (textState.text[textState.text.length - 1] != ' ')
      result += textState.text[textState.text.length - 1];
    dispatch(textActions.exec({ text: result }));
    props.showAlert('White space removed', 'success');
  };

  /**
   * Removes special characters from the text
   */
  const handleRemoveSpecialCharacters = () => {
    const result = textState.text.replace(/[^a-zA-Z0-9 ]/g, '');
    dispatch(textActions.exec({ text: result }));
    props.showAlert('Special Characters removed', 'success');
  };

  /**
   * Update the text on every keystroke
   */
  const handleOnChange = (event) =>
    dispatch(textActions.updateText({ text: event.target.value }));

  /**
   * Extracts the words from the text
   */
  const handletextExtract = () => {
    const letters = textState.text.match(/[a-z]|[A-Z]/g);
    if (letters !== null) {
      const result = letters.join('');
      dispatch(textActions.exec({ text: result }));
      props.showAlert('Extracted the words from the text', 'success');
    } else props.showAlert('No words found in the text', 'warning');
  };

  /**
   * Extract the numbers from the text
   */
  const handleNumExtract = () => {
    const digits = textState.text.match(/[0-9]/g);
    if (digits != null) {
      const result = digits.join('');
      dispatch(textActions.exec({ text: result }));
      props.showAlert('Extracted the Numbers from the text', 'success');
    } else props.showAlert('No number found', 'warning');
  };

  /**
   * Extract the link from the text
   */
  const handleLinkExtract = () => {
    const link = textState.text.match(
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
    );

    if (link != null) {
      const result = link.join('');
      dispatch(textActions.exec({ text: result }));
      props.showAlert('Extracted the Links from the text', 'success');
    } else {
      props.showAlert('No link found', 'warning');
    }
  };

  /**
   * Reverses the text
   */
  const handlereverseClick = () => {
    const newText = textState.text.split(' ');
    let i = 0;
    let result = '';

    for (i = 0; i < newText.length; i++)
      result = newText[i].split('').reverse().join('') + ' ' + result;
    dispatch(textActions.exec({ text: result }));
    props.showAlert('The text has been reversed', 'success');
  };

  //speech
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = new SpeechRecognition();

  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = 'en-US';

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
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
      dispatch(textActions.updateText(transcript));
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  /**
   * Replace the word with given prompt
   */
  const replace = () => {
    const word = prompt('what you want to replace');
    const newWord = prompt('write the new word');
    const result = textState.text.split(word).join(newWord);
    dispatch(textActions.exec({ text: result }));
  };

  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode === 'dark' ? 'white' : '#042743',
        }}
      >
        <h1 className="mb-2">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={textState.text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743',
            }}
          ></textarea>
        </div>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLowClick}
        >
          Convert to Lowercase
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleSentenceClick}
        >
          Convert to Sentencecase
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handlebase64Click}
        >
          Encode to Base64
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleNumExtract}
        >
          Extract Numbers
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLinkExtract}
        >
          Extract Links
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handletextExtract}
        >
          Extract Text
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleSpeakClick}
        >
          Listen Now
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleRemoveWhiteSpaceClick}
        >
          Remove White Space
        </button>

        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleRemoveSpecialCharacters}
        >
          Remove Special Characters
        </button>

        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopyClick}
        >
          Copy to Clipboard
        </button>
        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handlereverseClick}
        >
          Reverse the text
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={() => setIsListening((prevState) => !prevState)}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>

        <button
          disabled={textState.text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={replace}
        >
          Change Text
        </button>
        <button
          disabled={textState.undoStack.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUndo}
        >
          Undo Action
        </button>
        <button
          disabled={textState.redoStack.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleRedo}
        >
          Redo Action
        </button>
      </div>

      <div
        className="container my-3"
        style={{
          color: props.mode === 'dark' ? 'white' : '#042743',
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
