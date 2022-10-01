import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer mt-auto py-3 bg-light">
          <div className="container text-center">
            <span class="text-muted">
              Made with ❤️ by{" "}
              <a href="https://github.com/Susmita-Dey/TextUtils">Susmita-Dey</a>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
