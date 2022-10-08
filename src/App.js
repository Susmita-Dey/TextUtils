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

  const toggleMode = () => {
    Array.from(document.body.classList).forEach(element => {
        document.body.classList.remove(element)
      });
      Array.from(document.getElementById("myBox").classList).forEach(element => {
        document.getElementById("myBox").classList.remove(element)
      });
      Array.from(document.getElementById("nav").classList).forEach(element => {
          document.getElementById("nav").classList.remove(element)
      });
      
      document.body.classList.add('bg-'+ mode)
      document.getElementById("myBox").classList.add('bg-'+ mode)
      document.getElementById("myBox").classList.add("form-control")
      document.getElementById("nav").classList.add("navbar-"+mode, "bg-"+mode, "navbar", "navbar-expand-lg")
      
      Array.from(document.querySelectorAll("nav-link")).forEach(element => {
          element.style.color = "black !important"
      });
      
      if(mode==="dark"){
        Array.from(document.body.classList).forEach(element => {
          document.body.classList.remove(element)
          // setMode('dark');
          document.body.style.color="#fff";
          document.body.style.backgroundColor="#042743";
          document.querySelector(".nav-link").style.color = "white"
          document.querySelector(".navbar-brand").style.color = "white"
          document.querySelector("#myBox").style.color = "white";
        });
      }
      else if(mode==="light"){
        Array.from(document.body.classList).forEach(element => {
          document.body.classList.remove(element)
          // setMode('dark');
          document.body.style.color="#000";
          document.body.style.backgroundColor="#fff";
          document.querySelector(".nav-link").style.color = "black"
          document.querySelector(".navbar-brand").style.color = "black"
          document.querySelector("#myBox").style.color = "black";
        });
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
