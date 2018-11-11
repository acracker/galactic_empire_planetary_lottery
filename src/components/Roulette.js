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
    const rouletteCards = document.getElementsByClassName('roulette__card');

    switch(e.target.getAttribute('action')) {
      case 'spin':
        this.setState({ chosenPlanet: null });
        for (let item of rouletteCards) {
          item.classList.remove("roulette__card--stop");
          item.classList.add("roulette__card--spin");
        }
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
            for (let item of rouletteCards) {
              item.classList.remove("roulette__card--spin");
              item.classList.add("roulette__card--stop");
            }
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
        <div className="roulette__wrapper">
          <div className="roulette__container">
            <div className="roulette__card roulette__card--spin"></div>
            <div className="roulette__card roulette__card--spin">
              { chosenPlanet &&
                <Card chosenCard={chosenPlanet} />
              }
            </div>
            <div className="roulette__card roulette__card--spin"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Roulette;
