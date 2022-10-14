import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Navbar(props) {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      id="nav" style={{"border":"0.5px solid black"}}
    >
      <div className="container-fluid">
        <Link className="navbar-brand nav-link" to="/"  style={{"color":"black"}}>
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{"color":"black"}}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about" style={{"color":"black"}}>
                {props.aboutText}
              </Link>
            </li>
          </ul>
          <div className="d-flex">
              <div className="bg-primary rounded mx-2" onClick={()=>{props.toggleMode('primary')}} style={{height:'30px', width:'30px',cursor :'pointer',border:'1px solid black'}}></div>
            </div>
            <div className="d-flex">
              <div className="bg-danger rounded mx-2" onClick={()=>{props.toggleMode('danger')}} style={{height:'30px', width:'30px',cursor :'pointer',border:'1px solid black'}}></div>
            </div>
            <div className="d-flex">
              <div className="bg-success rounded mx-2" onClick={()=>{props.toggleMode('success')}} style={{height:'30px', width:'30px',cursor :'pointer',border:'1px solid black'}}></div>
            </div>
            <div className="d-flex">
              <div className="bg-warning rounded mx-2" onClick={()=>{props.toggleMode('warning')}} style={{height:'30px', width:'30px',cursor :'pointer',border:'1px solid black'}}></div>
            </div>
            <div className="d-flex text-dark">
              <div className="bg-dark rounded mx-2" onClick={()=>{props.toggleMode('dark')}} style={{height:'30px', width:'30px',cursor :'pointer',border:'1px solid white'}}></div>
            </div>
            <div className="d-flex text-light">
              <div className="bg-light rounded mx-2" onClick={()=>{props.toggleMode('light')}} style={{height:'30px', width:'30px',cursor :'pointer',border:'1px solid black'}}></div>
            </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Set title here",
  aboutText: "About",
};
