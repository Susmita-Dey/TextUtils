import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Footer from "./components/Footer";
import ErrorPage from './components/ErrorPage'

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

    const toggleMode = (mode) => {
      // dynamic chnages
      // body
      document.body.style.backgroundColor = "#fff"
      document.body.style.color = "#000"

      
      // navbar
      Array.from(document.getElementById("nav").classList).forEach(element => {
        document.getElementById("nav").classList.remove(element)
      });
      document.getElementById("nav").classList.add("navbar-"+mode, "bg-"+mode, "navbar", "navbar-expand-lg")
      Array.from(document.querySelectorAll(".nav-link")).forEach(element => {
        element.style.color = "#fff"
      });
      
      
      // buttons
      Array.from(document.querySelectorAll(".btn")).forEach(element => {
        element.style.backgroundColor = ""
        element.style.color = "#fff"
        Array.from(element.classList).forEach(e => {
          element.classList.remove(e)
          element.classList.add("btn", "mx-1", "my-1","btn-"+mode)
        });
      });


      // footer
      Array.from(document.getElementById("footer").classList).forEach(element => {
        document.getElementById("footer").classList.remove(element)
      });
      document.getElementById("footer").classList.add("footer", "mt-auto", "py-3", "bg-"+mode)
      document.getElementById("footer").style.color = "#fff"
      
      
      
      // changes particular to each mode
      if(mode==="dark"){
        document.body.style.backgroundColor = "#042743"
        document.body.style.color = "#fff"
        document.getElementById("myBox").style.backgroundColor = "rgb(19, 70, 110)"
        document.getElementById("myBox").style.color = "#fff"
        Array.from(document.querySelectorAll(".btn")).forEach(element => {
          element.style.backgroundColor = "rgb(19, 70, 110)"
          element.style.color = "#fff"
        });
      }
      
      
      if(mode==="light"){
        document.getElementById("myBox").style.backgroundColor = "#fff"
        document.getElementById("myBox").style.color = "#000"
        Array.from(document.querySelectorAll(".nav-link")).forEach(element => {
          element.style.color = "#000"
        });
        Array.from(document.querySelectorAll(".btn")).forEach(element => {
          element.style.backgroundColor = "#fff"
          element.style.color = "#000"
        });
        document.getElementById("footer").style.color = "#000"
      }
      
      
      if(mode==="primary"){
        document.getElementById("myBox").style.backgroundColor = "blue"
        document.getElementById("myBox").style.color = "#fff"
      }
      
      
      if(mode==="danger"){
        document.getElementById("myBox").style.backgroundColor = "#d9534f"
        document.getElementById("myBox").style.color = "#fff"
      }
      
      
      
      if(mode==="success"){
        document.getElementById("myBox").style.backgroundColor = "#5cb85c"
        document.getElementById("myBox").style.color = "#fff"
      }
      
      
      if(mode==="warning"){
        document.getElementById("myBox").style.backgroundColor = "rgb(255, 193, 7)"
        document.getElementById("myBox").style.color = "#000"
        Array.from(document.querySelectorAll(".btn")).forEach(element => {
          element.style.color = "#000"
        });
        Array.from(document.querySelectorAll(".nav-link")).forEach(element => {
          element.style.color = "#000"
        });
        document.getElementById("footer").style.color = "#000"
      }
    };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About TextUtils" /> */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-3">
        <Routes>
          {/* /users --> Component 1
          /users/home --> Component 2
          Always use "exact" keyword to match the exact path */}
          <Route
            exact
            path="/"
            element={
              <TextForm
                showAlert={showAlert}
                heading="Enter The Text To Analyze Below"
                mode={mode}
              />
            }
          />
          <Route exact path="/about" element={<About mode={mode} />} />
          <Route path="*" element={<ErrorPage mode={mode}/>} />
        </Routes>

        {/* <About /> */}
      </div>
      <Footer/>
    </>
  );
}

export default App;
