import React, { Component } from 'react';
import Api from '../services/Api';
import { getRandomIntInclusive } from '../services/Utils';

class Roulette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlanet: null,
    };
  }

  componentDidMount() {
    const rouletteButton = document.getElementById('rouletteButton');

    rouletteButton.addEventListener('click', async function () {
      await Api.getRequest('/planets/')
        .then((result) => {
          const planetsCount = result.count;
          this.setState({
            currentPlanet: getRandomIntInclusive(1, planetsCount),
          });
        });
        
      this.props.chosenPlanet(this.state.currentPlanet);

    }.bind(this));
  }

  render() {
    return (
      <div>
        <div className="roulette">
          <div className="roulette__card roulette__previous"></div>

          <button className="roulette__button" id="rouletteButton">
            <div className="roulette__card roulette__current"></div>
          </button>

          <div className="roulette__card roulette__next"></div>
        </div>
      </div>
    );
  }
}

export default Roulette;
