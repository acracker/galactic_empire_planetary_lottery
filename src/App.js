import React, { Component } from 'react';
import './App.css';
import Roulette from './components/Roulette';

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1>Galactic Empire's Planetary Roulette</h1>
        </header>
        <main className="main">
          <Roulette />
        </main>
        <footer className="footer"></footer>
      </div>
    );
  }
}

export default App;