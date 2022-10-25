import React, { Component } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import { useSelector} from 'react-redux';

const Footer = () =>{
    const themeState = useSelector((state) => state.theme);
    return (
      <>
        <footer className={themeState.mode === "light" ? "footer mt-auto py-2 bg-light text-muted" : "footer mt-auto py-2 bg-dark text-white"} style={{height: "2.7rem"}}>
          <div className="container text-center">
            <p style={{display: "flex", justifyContent: "center", alignItems: "center" }}>
              Made with ❤️ by <a className={themeState.mode === "light" ? "text-muted ms-1" : "text-white ms-1"} href="https://github.com/Susmita-Dey/TextUtils" target="_blank">Susmita-Dey</a> <a className={themeState.mode === "light" ? "text-black ms-2" : "text-white ms-2"} href="https://github.com/Susmita-Dey/TextUtils" target="_blank"><AiOutlineGithub size={25}/></a>
            </p>
          </div>
        </footer>
      </>
    );
}

export default Footer;
