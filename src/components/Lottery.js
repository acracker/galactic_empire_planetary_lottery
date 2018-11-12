import React, { Component } from 'react';
import Api from '../services/Api';
import { getRandomIntInclusive } from '../services/Utils';
import Card from './Card';

class Lottery extends Component {
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
      const lotteryCards = document.getElementsByClassName('lottery__card');

      for (let i = 0; i < lotteryCards.length; i++) {
        if(i === 0) {
          lotteryCards[i].classList.add('lottery__card--selected');
        } else {
          lotteryCards[i].classList.add('lottery__card--stop');
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
      const lotteryCards = document.getElementsByClassName('lottery__card');

      for (let i = 0; i < lotteryCards.length; i++) {
        if(i === 0) {
          lotteryCards[i].classList.remove('lottery__card--selected');
        } else {
          lotteryCards[i].classList.remove('lottery__card--stop');
        }
      }
    }
  }

  render() {
    const chosenPlanet = this.state.chosenPlanet;

    return (
      <div className="lottery">
        <div className="lottery__wrapper">
          <div className="lottery__container">
            <div className="lottery__card lottery__card--spin"
              onClick={() => this.handleCardClick()}
            >
              <div className="lottery__card-back"></div>
              <div className="lottery__card-front">
                { chosenPlanet &&
                  <Card chosenCard={chosenPlanet} />
                }
              </div>
            </div>
            <div className="lottery__card lottery__card--spin">
              <div className="lottery__card-back"></div>
            </div>
            <div className="lottery__card lottery__card--spin">
              <div className="lottery__card-back"></div>
            </div>
          </div>
        </div>
        { this.state.spin === false &&
          <button
            className="button" title="Spin again"
            action="stop" onClick={() => this.handleButtonClick()}>
            Spin again
          </button>
        }
      </div>
    );
  }
}

export default Lottery;
