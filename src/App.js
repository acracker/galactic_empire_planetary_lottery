import React, { Component } from 'react';
import './App.css';
import Lottery from './components/Lottery';

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1>Galactic Empire's Planetary Lottery</h1>
        </header>
        <main className="main">
          <Lottery />
        </main>
        <footer className="footer"></footer>
      </div>
    );
  }
}

export default App;