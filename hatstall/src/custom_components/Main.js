import React, { Component } from 'react';
import logo from '../logo.png';

export let Main = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Hatstall made it with React.js!
            </p>
        </header>
    );
}