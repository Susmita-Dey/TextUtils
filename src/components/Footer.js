import React, { Component } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';

export class Footer extends Component {
  render() {
    let styles = {
      fontSize: '2em',
      color: 'black',
      marginLeft: '.9rem',
    };
    return (
      <div>
        <footer className="footer mt-auto py-3 bg-light">
          <div className="container text-center">
            <span class="text-muted">
              Made with ❤️ by Susmita-Dey.
              <a style={styles} href="https://github.com/Susmita-Dey/TextUtils">
                <AiOutlineGithub />
              </a>{' '}
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
