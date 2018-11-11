import React, { Component } from 'react';
import Api from '../services/Api';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planet: null,
    }
  }

  componentDidMount() {
    const chosenCard = this.props.chosenCard;

    Api.getRequest('/planets/' + chosenCard)
      .then((result) => {
        this.setState({ planet: result });
      });
  }

  render() {
    const planet = this.state.planet;

    const card = function () {
      if(planet) {
        return(
          <div className="card__inner">
            <h2>{planet.name}</h2>
            <dl>
              <dt>Climate</dt>
              <dd>{planet.climate}</dd>
              <dt>Terrain</dt>
              <dd>{planet.terrain}</dd>
              <dt>Population</dt>
              <dd>{planet.population}</dd>
            </dl>
          </div>
        );
      }
    }

    return(
      <div className="card">
        { card() }
      </div>
    );
  }
}

export default Card;
