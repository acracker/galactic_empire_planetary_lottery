import React, { Component } from 'react';
import Api from '../services/Api';
import { getRandomIntInclusive } from '../services/Utils';
import Card from './Card';

class Roulette extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenPlanet: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    switch(e.target.getAttribute('action')) {
      case 'spin':
        this.setState({ chosenPlanet: null });
        e.target.setAttribute('action', 'stop');
      break;
      default:
        Api.getRequest('/planets/')
          .then((result) => {
            this.setState({
              chosenPlanet: getRandomIntInclusive(1, result.count),
            });
          });

        e.target.setAttribute('action', 'spin');
      break;
    }
  }

  render() {
    const card = function () {
      const chosenPlanet = this.state.chosenPlanet;
      if (chosenPlanet) return <Card chosenCard={chosenPlanet} />;
    }.bind(this);

    return (
      <div className="roulette">
        <button
          className="roulette__button"
          id="rouletteButton"
          action="stop"
          onClick={(e) => this.handleClick(e)}
        ></button>

        <div className="roulette__card roulette__previous"></div>
        <div className="roulette__card roulette__current">
          { card() }
        </div>
        <div className="roulette__card roulette__next"></div>
      </div>
    );
  }
}

export default Roulette;
