import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer bg-dark text-white mt-5 p-4 text-center">
                Copyright &copy; {new Date().getFullYear()} Andriy Galelyuka
            </footer>
        );
    }
}

export default Footer