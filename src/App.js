import { Routes, Route } from 'react-router-dom';

import './App.css';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Footer from './components/Footer';
import ErrorPage from './components/ErrorPage';

const App = () => {
  // const removeBodyClasses = () => {
  //   document.body.classList.remove("bg-light");
  //   document.body.classList.remove("bg-dark");
  //   document.body.classList.remove("bg-success");
  //   document.body.classList.remove("bg-danger");
  //   document.body.classList.remove("bg-warning");
  //   document.body.classList.remove("bg-primary");
  // };

  // const toggleMode = () => {
  //   // removeBodyClasses();
  //   // console.log(cls);
  //   // document.body.classList.add("bg-" + cls);
  //   if (mode === "light") {
  //     setMode("dark");
  //     document.body.style.backgroundColor = "#042743";
  //     showAlert("Dark mode has been enabled", "success");

  //     // document.title = "TextUtils - Dark Mode";
  //     // setInterval(() => {
  //     //   document.title = "TextUtils - Dark Mode";
  //     // }, 2000);
  //     // setInterval(() => {
  //     //   document.title = "Install TextUtils  now";
  //     // }, 1500);
  //   } else {
  //     setMode("light");
  //     document.body.style.backgroundColor = "white";
  //     showAlert("Light mode has been enabled", "success");
  //     // document.title = "TextUtils - Light Mode";
  //   }
  // };

  return (
    <>
      <Navbar />
      <Alert />
      <div className="container my-3">
        <Routes>
          {/* /users --> Component 1
          /users/home --> Component 2
          Always use "exact" keyword to match the exact path */}
          <Route exact path="/" element={<TextForm />} />
          <Route exact path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
