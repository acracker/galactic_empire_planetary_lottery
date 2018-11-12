import React, { Component } from 'react';
import Api from '../services/Api';
import { getRandomIntInclusive } from '../services/Utils';
import Card from './Card';

class Roulette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenPlanet: null,
      spin: true
    };
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleCardClick() {
    if (this.state.spin === true) {
      this.setState({ spin: false });
      const rouletteCards = document.getElementsByClassName('roulette__card');

      for (let i = 0; i < rouletteCards.length; i++) {
        if(i === 0) {
          rouletteCards[i].classList.add('roulette__card--selected');
        } else {
          rouletteCards[i].classList.add('roulette__card--stop');
        }
      }

      Api.getRequest('/planets/')
        .then((result) => {
          this.setState({
            chosenPlanet: getRandomIntInclusive(1, result.count),
          });
        });
    }
  }

  handleButtonClick() {
    if (this.state.spin === false) {
      this.setState({
        chosenPlanet: null,
        spin: true
      });
      const rouletteCards = document.getElementsByClassName('roulette__card');

      for (let i = 0; i < rouletteCards.length; i++) {
        if(i === 0) {
          rouletteCards[i].classList.remove('roulette__card--selected');
        } else {
          rouletteCards[i].classList.remove('roulette__card--stop');
        }
      }
    }
  }

  render() {
    const chosenPlanet = this.state.chosenPlanet;

    return (
      <div className="roulette">
        <div className="roulette__wrapper">
          <div className="roulette__container">
            <div className="roulette__card roulette__card--spin"
              onClick={() => this.handleCardClick()}
            >
              <div className="roulette__card-back"></div>
              <div className="roulette__card-front">
                { chosenPlanet &&
                  <Card chosenCard={chosenPlanet} />
                }
              </div>
            </div>
            <div className="roulette__card roulette__card--spin">
              <div className="roulette__card-back"></div>
            </div>
            <div className="roulette__card roulette__card--spin">
              <div className="roulette__card-back"></div>
            </div>
          </div>
        </div>
        { this.state.spin === false &&
          <button
            className="roulette__button" id="rouletteButton" title="Spin again"
            action="stop" onClick={() => this.handleButtonClick()}>
            Spin again
          </button>
        }
      </div>
    );
  }
}

export default Roulette;
