import React, { useState, useEffect, useReducer } from "react";
import { Buffer } from "buffer";
import { initialTextState, textReducer } from "../reducers/textReducer";

export default function TextForm(props) {
  // text="new text" // Wrong way to change the state
  // setText("new text") // Correct way to change the state
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [textState, dispatchTextAction] = useReducer(
    textReducer,
    initialTextState
  );

  console.log(textState);
  useEffect(() => {
    setText(textState.text);
  }, [textState.text]);

  const handleUndo = () => {
    dispatchTextAction({ type: "undo" });
  };

  const handleRedo = () => {
    dispatchTextAction({ type: "redo" });
  };

  //function to convert text into base64 encoding
  const handlebase64Click = () => {
    let encodedData = Buffer.from(text).toString("base64");
    setText(encodedData);
    dispatchTextAction({ type: "exec", payload: { text: encodedData } });
    props.showAlert("Converted to Base64 encoding", "success");
  };
  //---------------------------------------------
  const handleUpClick = () => {
    // console.log("Uppercase was clicked!" + text);
    let newText = text.toUpperCase();
    setText(newText);
    dispatchTextAction({ type: "exec", payload: { text: newText } });
    props.showAlert("Converted to uppercase", "success");
  };
  const handleLowClick = () => {
    // console.log("Lowercase was clicked!" + text);
    let newText = text.toLowerCase();
    setText(newText);
    dispatchTextAction({ type: "exec", payload: { text: newText } });
    props.showAlert("Converted to lowercase", "success");
  };
  const handleSentenceClick = () => {
    let newText = text.toLowerCase().split(" ");
    for (var i = 0; i < newText.length; i++) {
      newText[i] = newText[i].charAt(0).toUpperCase() + newText[i].slice(1);
    }
    newText = newText.join(" ");
    setText(newText);
    dispatchTextAction({ type: "exec", payload: { text: newText } });
    props.showAlert("Converted to Sentencecase", "success");
  };
  const handleClearClick = () => {
    if (window.confirm("Do you want to delete the text")) {
      let newText = "";
      setText(newText);
      dispatchTextAction({ type: "exec", payload: { text: newText } });
      props.showAlert("Text has been cleared", "success");
    }
  };
  const handleSpeakClick = (event) => {
    let el = event.currentTarget;
    if (el.innerHTML === "Listen Now") el.innerHTML = "Stop Now";
    else el.innerHTML = "Listen Now";

    // el.innerHTML has already been changed here, hence checking for the opposite value
    if (el.innerHTML === "Stop Now") {
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      window.speechSynthesis.speak(msg);
    } else {
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      window.speechSynthesis.cancel(msg);
    }
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text has been copied to clipboard", "success");
  };
  const handleRemoveWhiteSpaceClick = () => {
    let res = "";
    for (let i = 0; i < text.length - 1; i++) {
      if (text[i] == " " && text[i + 1] == " ") continue;
      else res += text[i];
    }
    if (text[text.length - 1] != " ") res += text[text.length - 1];
    //console.log(res);
    setText(res);
    dispatchTextAction({ type: "exec", payload: { text: res } });
    props.showAlert("White space removed", "success");
  };

  /**
   * Method used for removing special symbols from string
   */
  const handleRemoveSpecialCharacters = () => {
    let string_without_specialsymbol = text.replace(/[^a-zA-Z0-9 ]/g, "");
    setText(string_without_specialsymbol);
    dispatchTextAction({
      type: "exec",
      payload: { text: string_without_specialsymbol },
    });
    props.showAlert("Special Characters removed", "success");
  };

  const handleOnChange = (event) => {
    // console.log("On change");
    setText(event.target.value);
  };

  //To extract the words from the text.
  const handletextExtract = () => {
    const letters = text.match(/[a-z]|[A-Z]/g);
    if (letters !== null) {
      const res1 = letters.join("");
      setText(res1);
      dispatchTextAction({ type: "exec", payload: { text: res1 } });
      props.showAlert("Extracted the words from the text", "success");
    } else {
      props.showAlert("No words found in the text", "warning");
    }
  };
  //To extract the number from the text.
  const handleNumExtract = () => {
    const digits = text.match(/[0-9]/g);
    if (digits != null) {
      const res = digits.join("");
      setText(res);
      dispatchTextAction({ type: "exec", payload: { text: res } });
      props.showAlert("Extracted the Numbers from the text", "success");
    } else {
      props.showAlert("No number found", "warning");
    }
  };

  const handleLinkExtract = () => {
    const link = text.match(
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
    );

    if (link != null) {
      const res = link.join("");
      setText(res);
      dispatchTextAction({ type: "exec", payload: { text: res } });
      props.showAlert("Extracted the Links from the text", "success");
    } else {
      props.showAlert("No link found", "warning");
    }
  };

  const handlereverseClick = () => {
    // console.log("Reverse was clicked!" + text);
    let newText = text.split(" ");
    var i = 0;
    let finalText = "";

    for (i = 0; i < newText.length; i++) {
      finalText = newText[i].split("").reverse().join("") + " " + finalText;
      //  console.log(newText[i].split('').reverse().join(''));
    }
    setText(finalText);
    dispatchTextAction({ type: "exec", payload: { text: finalText } });
    props.showAlert("The text has been reversed", "success");
  };

  //speech

  let mic;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    mic = new SpeechRecognition();
    mic.continuous = true;
    mic.interimResults = true;
    mic.lang = "en-US";
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
      console.log("start");
    } else {
      mic.stop();
      console.log("stopeed");
    }
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setText(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const replace = () => {
    let word = prompt("what you want to replace");
    let newword = prompt("write the new word");
    let newText = text.split(word).join(newword);
    setText(newText);
    dispatchTextAction({ type: "exec", payload: { text: newText } });
  };

  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode === "dark" ? "white" : "#042743",
        }}
      >
        <h1 className="mb-2">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLowClick}
        >
          Convert to Lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleSentenceClick}
        >
          Convert to Sentencecase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handlebase64Click}
        >
          Encode to Base64
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleNumExtract}
        >
          Extract Numbers
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLinkExtract}
        >
          Extract Links
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handletextExtract}
        >
          Extract Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleSpeakClick}
        >
          Listen Now
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleRemoveWhiteSpaceClick}
        >
          Remove White Space
        </button>

        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleRemoveSpecialCharacters}
        >
          Remove Special Characters
        </button>

        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopyClick}
        >
          Copy to Clipboard
        </button>

        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handlereverseClick}
        >
          Reverse the text
        </button>

        {mic && (
          <button
            className="btn btn-primary mx-1 my-1"
            onClick={() => setIsListening((prevState) => !prevState)}
          >
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
        )}

        <button
          disabled={text.length === 0}
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
          color: props.mode === "dark" ? "white" : "#042743",
        }}
      >
        <h2>Your Text Summary</h2>
        <p>
          <b>
            {
              text
                .replace(/\s/)
                .split(" ")
                .filter((value) => value !== "").length
            }
          </b>{" "}
          words,
          <b> {text.trim().length}</b> characters,
          <b>
            {" "}
            {
              text
                .replace(/\n/g, ".")
                .split(".")
                .filter((value) => value !== "").length
            }
          </b>{" "}
          statements,
          <b> {text.split("?").length - 1}</b> questions,{" "}
          <b>{text.split("!").length - 1}</b> exclamations.
        </p>
        <p>
          {0.08 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!!"}</p>
      </div>
    </>
  );
}
