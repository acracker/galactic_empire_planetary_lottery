import React, { Component } from 'react';
import './App.css';
import Roulette from './components/Roulette';
import Card from './components/Card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenPlanet: null,
    }
    this.handleChosenPlanet = this.handleChosenPlanet.bind(this);
  }

  handleChosenPlanet(chosenPlanet) {
    this.setState({ chosenPlanet: chosenPlanet });
  }

  render() {
    const card = function () {
      const chosenPlanet = this.state.chosenPlanet;
      if (chosenPlanet) {
        return <Card chosenCard={chosenPlanet} />;
      }
    }.bind(this);

    return (
      <div>
        <header>
          <h1>Galactic Empire's Planetary Roulette</h1>
        </header>

        <main>
          <Roulette chosenPlanet={this.handleChosenPlanet} />
          { card() }
        </main>

        <footer></footer>
      </div>
    );
  }
}

export default App;