import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer mt-auto py-3" id="footer">
            <div className="container text-center">
            <span>Made with ❤️ by Susmita-Dey.<a href="https://github.com/Susmita-Dey/TextUtils" id="footerLink" style={{color:"blue"}}>Github Link</a> </span>
            </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
