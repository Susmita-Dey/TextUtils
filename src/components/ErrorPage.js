import React from "react";
import {Link} from "react-router-dom"

export default function ErrorPage(props) {
  let myStyle = {
    color: props.mode === "dark" ? "white" : "#042743",
    backgroundColor: props.mode === "dark" ? "rgb(36 74 104)" : "white",
  };

  return (
    <div
      className="container"
      style={{ color: props.mode === "dark" ? "white" : "#042743" }}
    >
      <div className="main-content" style={{display: 'flex',flexDirection:"column", alignItems:'center', justifyContent: 'center'}}>
        <h2 style={{textAlign: 'center'}}>404 <br/>Error Not Found!</h2>
        <p>Go to <Link to="/">Home</Link></p>
      </div>
    </div>
  );
}
