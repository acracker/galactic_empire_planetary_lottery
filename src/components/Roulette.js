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
    const el = e.target;

    switch(e.target.getAttribute('action')) {
      case 'spin':
        this.setState({ chosenPlanet: null });
        el.setAttribute('action', 'stop');
        el.textContent ='Stop';
      break;
      default:
        Api.getRequest('/planets/')
          .then((result) => {
            this.setState({
              chosenPlanet: getRandomIntInclusive(1, result.count),
            });
          })
          .then(() => {
            el.setAttribute('action', 'spin');
            el.textContent = 'Spin again';
          });
      break;
    }
  }

  render() {
    const chosenPlanet = this.state.chosenPlanet;

    return (
      <div className="roulette">
        <button
          className="roulette__button" id="rouletteButton"
          action="stop" onClick={(e) => this.handleClick(e)}>
          Stop
        </button>

        <div className="roulette__card roulette__previous"></div>
        <div className="roulette__card roulette__current">
          { chosenPlanet &&
            <Card chosenCard={chosenPlanet} />
          }
        </div>
        <div className="roulette__card roulette__next"></div>
      </div>
    );
  }
}

export default Roulette;
