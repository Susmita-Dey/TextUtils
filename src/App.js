import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Footer from "./components/Footer";


const defaultMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

function App() {
  const [mode, setMode] = useState(defaultMode);
  const [alert, setAlert] = useState(null);

  // const removeBodyClasses = () => {
  //   document.body.classList.remove("bg-light");
  //   document.body.classList.remove("bg-dark");
  //   document.body.classList.remove("bg-success");
  //   document.body.classList.remove("bg-danger");
  //   document.body.classList.remove("bg-warning");
  //   document.body.classList.remove("bg-primary");
  // };

  useEffect(() => {
    if (mode === "dark") {
      document.body.style.backgroundColor = "#042743";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [mode]);

  const toggleMode = () => {
    // removeBodyClasses();
    // console.log(cls);
    // document.body.classList.add("bg-" + cls);
    if (mode === "light") {
      setMode("dark");
      showAlert("Dark mode has been enabled", "success");

      // document.title = "TextUtils - Dark Mode";
      // setInterval(() => {
      //   document.title = "TextUtils - Dark Mode";
      // }, 2000);
      // setInterval(() => {
      //   document.title = "Install TextUtils  now";
      // }, 1500);
    } else {
      setMode("light");
      showAlert("Light mode has been enabled", "success");
      // document.title = "TextUtils - Light Mode";
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
        </Routes>

        {/* <About /> */}
      </div>
      <Footer/>
    </>
  );
}

export default App;
