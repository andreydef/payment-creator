import React, { Component } from 'react';

import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer bg-dark text-white mt-5 p-4 text-center">
                    Copyright &copy; {new Date().getFullYear()} Andriy Galelyuka
                </footer>
            </div>
        );
    }
}

export default Footer;