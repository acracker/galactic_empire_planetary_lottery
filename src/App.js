import React, { Component } from 'react';
import './App.css';
import Lottery from './components/Lottery';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="header">
          <h1>Galactic Empire's Planetary Lottery</h1>
        </header>
        <main className="main">
          <Lottery />
        </main>
        <footer className="footer">
          by <a href="https://github.com/glauberm" target="_blank"
            rel="noopener noreferrer">Glauber Mota</a>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;