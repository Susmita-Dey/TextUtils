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

  // const removeBodyClasses = () => {
  //   document.body.classList.remove("bg-light");
  //   document.body.classList.remove("bg-dark");
  //   document.body.classList.remove("bg-success");
  //   document.body.classList.remove("bg-danger");
  //   document.body.classList.remove("bg-warning");
  //   document.body.classList.remove("bg-primary");
  // };

  const toggleMode = (mode) => {
    if(mode==="dark"){
      document.body.style.backgroundColor = "#042743"
      document.body.style.color = "#fff"

      Array.from(document.getElementById("nav").classList).forEach(element => {
        document.getElementById("nav").classList.remove(element)
      });
      document.getElementById("nav").classList.add("navbar-"+mode, "bg-"+mode, "navbar", "navbar-expand-lg")
      Array.from(document.querySelectorAll(".nav-link")).forEach(element => {
        element.style.color = "#fff"
      });
      document.getElementById("myBox").style.backgroundColor = "rgb(19, 70, 110)"
      document.getElementById("myBox").style.color = "#fff"
      Array.from(document.querySelectorAll(".btn")).forEach(element => {
        element.style.backgroundColor = "rgb(19, 70, 110)"
        element.style.color = "#fff"
        
      });
      Array.from(document.getElementById("footer").classList).forEach(element => {
        document.getElementById("footer").classList.remove(element)
      });
      document.getElementById("footer").classList.add("footer", "mt-auto", "py-3", "bg-",mode)
    }


    if(mode==="light"){
      document.body.style.backgroundColor = "#fff"
      document.body.style.color = "#000"

      Array.from(document.getElementById("nav").classList).forEach(element => {
        document.getElementById("nav").classList.remove(element)
      });
      document.getElementById("nav").classList.add("navbar-"+mode, "bg-"+mode, "navbar", "navbar-expand-lg")
      Array.from(document.querySelectorAll(".nav-link")).forEach(element => {
        element.style.color = "#000"
      });
      document.getElementById("myBox").style.backgroundColor = "#fff"
      document.getElementById("myBox").style.color = "#000"
      Array.from(document.querySelectorAll(".btn")).forEach(element => {
        element.style.backgroundColor = "#fff"
        element.style.color = "#000"
        
      });
      Array.from(document.getElementById("footer").classList).forEach(element => {
        document.getElementById("footer").classList.remove(element)
      });
      document.getElementById("footer").classList.add("footer", "mt-auto", "py-3", "bg-",mode)
    }


    if(mode==="primary"){
      document.body.style.backgroundColor = "blue"
      document.body.style.color = "#fff"

      Array.from(document.getElementById("nav").classList).forEach(element => {
        document.getElementById("nav").classList.remove(element)
      });
      document.getElementById("nav").classList.add("navbar-"+mode, "bg-"+mode, "navbar", "navbar-expand-lg")
      Array.from(document.querySelectorAll(".nav-link")).forEach(element => {
        element.style.color = "#fff"
      });
      document.getElementById("myBox").style.backgroundColor = "rgb(19, 70, 110)"
      document.getElementById("myBox").style.color = "#fff"
      Array.from(document.querySelectorAll(".btn")).forEach(element => {
        element.style.backgroundColor = "rgb(19, 70, 110)"
        element.style.color = "#fff"
        
      });
      Array.from(document.getElementById("footer").classList).forEach(element => {
        document.getElementById("footer").classList.remove(element)
      });
      document.getElementById("footer").classList.add("footer", "mt-auto", "py-3", "bg-",mode)
    }


    if(mode==="danger"){
      document.body.style.backgroundColor = "red"
      document.body.style.color = "#fff"

      Array.from(document.getElementById("nav").classList).forEach(element => {
        document.getElementById("nav").classList.remove(element)
      });
      document.getElementById("nav").classList.add("navbar-"+mode, "bg-"+mode, "navbar", "navbar-expand-lg")
      Array.from(document.querySelectorAll(".nav-link")).forEach(element => {
        element.style.color = "#fff"
      });
      document.getElementById("myBox").style.backgroundColor = "#ff5c5c"
      document.getElementById("myBox").style.color = "#fff"
      Array.from(document.querySelectorAll(".btn")).forEach(element => {
        element.style.backgroundColor = "#ff5c5c"
        element.style.color = "#fff"
        
      });
      Array.from(document.getElementById("footer").classList).forEach(element => {
        document.getElementById("footer").classList.remove(element)
      });
      document.getElementById("footer").classList.add("footer", "mt-auto", "py-3", "bg-",mode)
    }



    if(mode==="success"){
      document.body.style.backgroundColor = "#00A300"
      document.body.style.color = "#fff"

      Array.from(document.getElementById("nav").classList).forEach(element => {
        document.getElementById("nav").classList.remove(element)
      });
      document.getElementById("nav").classList.add("navbar-"+mode, "bg-"+mode, "navbar", "navbar-expand-lg")
      Array.from(document.querySelectorAll(".nav-link")).forEach(element => {
        element.style.color = "#fff"
      });
      document.getElementById("myBox").style.backgroundColor = "#5CFF5C"
      document.getElementById("myBox").style.color = "#fff"
      Array.from(document.querySelectorAll(".btn")).forEach(element => {
        element.style.backgroundColor = "#5CFF5C"
        element.style.color = "#fff"
        
      });
      Array.from(document.getElementById("footer").classList).forEach(element => {
        document.getElementById("footer").classList.remove(element)
      });
      document.getElementById("footer").classList.add("footer", "mt-auto", "py-3", "bg-",mode)
    }


    if(mode==="warning"){
      document.body.style.backgroundColor = "#FFFF2E"
      document.body.style.color = "#000"

      Array.from(document.getElementById("nav").classList).forEach(element => {
        document.getElementById("nav").classList.remove(element)
      });
      document.getElementById("nav").classList.add("navbar-"+mode, "bg-"+mode, "navbar", "navbar-expand-lg")
      Array.from(document.querySelectorAll(".nav-link")).forEach(element => {
        element.style.color = "#000"
      });
      document.getElementById("myBox").style.backgroundColor = "#FFFF5C"
      document.getElementById("myBox").style.color = "#000"
      Array.from(document.querySelectorAll(".btn")).forEach(element => {
        element.style.backgroundColor = "#FFFF5C"
        element.style.color = "#000"
        
      });
      Array.from(document.getElementById("footer").classList).forEach(element => {
        document.getElementById("footer").classList.remove(element)
      });
      document.getElementById("footer").classList.add("footer", "mt-auto", "py-3", "bg-",mode)
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
