import React, { useState } from "react";

// Minor words which are not considered for titlecasing
const arrMinorWords = ['a', 'an', 'of', 'the', 'in', 'at', 'is'];

export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("Uppercase was clicked!" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase", "success");
  };
  const handleLowClick = () => {
    // console.log("Lowercase was clicked!" + text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase", "success");
  };

  const handleTitleClick = () => {
    var arrTitle = text.split(" ")        
    var arrLower=[];
  
    // Converting all the input words to lowercase
    for (var j=0;j<arrTitle.length;j++){
      arrTitle[j]=arrTitle[j].split("");
      for (var k=0;k<arrTitle[j].length;k++) arrTitle[j][k]=arrTitle[j][k].toLowerCase();
      arrLower.push(arrTitle[j].join(""));
    }
   
    // Filtering for minor words and then capatilizing the first letter
    for (j=0;j<arrLower.length;j++){
      if((arrMinorWords.indexOf(arrLower[j]))===-1){      
        var word1 = arrLower[j].split("");
        word1[0] = word1[0].toUpperCase();
        arrLower[j] = word1.join("");
      }
    }

    // First letter of the first word must always be capitalised
    var firstWord = arrLower[0].split("");
    firstWord[0] = firstWord[0].toUpperCase();
    arrLower[0] = firstWord.join("");
      
    arrLower = arrLower.join(" ");
    setText(arrLower);
    props.showAlert("Converted to titlecase", "success");
  };
  
  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text has been cleared", "success");
  };
  const handleSpeakClick = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };
  const handleStopClick = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.cancel(msg);
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text has been copied to clipboard", "success");
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
      props.showAlert("Extracted the Links from the text", "success");
    } else {
      props.showAlert("No link found", "warning");
    }
  };
  const [text, setText] = useState("");
  // text="new text" // Wrong way to change the state
  // setText("new text") // Correct way to change the state
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
          onClick={handleTitleClick}
        >
          Convert to Titlecase
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
          onClick={handleStopClick}
        >
          Stop Now
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopyClick}
        >
          Copy to Clipboard
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
          {text.length > 0 ? text.trim().split(/\s+/).length : 0} words,{" "}
          {text.length} characters
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
