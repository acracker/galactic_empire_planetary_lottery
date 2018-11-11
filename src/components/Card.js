import React, { Component } from 'react';
import Api from '../services/Api';
import Films from './Films';

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

    console.log(planet);

    return(
      <div className="card" id="card">
        { planet &&
          <div className="card__inner">
            <h2>{planet.name}</h2>
            <dl>
              <dt>Climate</dt>
              <dd>{planet.climate}</dd>
              <dt>Terrain</dt>
              <dd>{planet.terrain}</dd>
              <dt>Population</dt>
              <dd>{planet.population}</dd>
              { planet.population.length &&
                <Films urls={planet.films} />
              }
            </dl>
          </div>
        }
      </div>
    );
  }
}

export default Card;
