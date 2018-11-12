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

    return(
      <div className="card" id="card">
        { planet &&
          <div className="card__inner">
            <h2 className="card__title">{planet.name}</h2>
            <dl className="card__list">
              <div className="card__row">
                <dt>Climate</dt>
                <dd>{planet.climate}</dd>
              </div>
              <div className="card__row">
                <dt>Terrain</dt>
                <dd>{planet.terrain}</dd>
              </div>
              <div className="card__row">
                <dt>Surface water</dt>
                <dd>{planet.surface_water}</dd>
              </div>
              <div className="card__row">
                <dt>Population</dt>
                <dd>{planet.population}</dd>
              </div>
              <div className="card__row">
                { planet.population.length &&
                  <Films urls={planet.films} />
                }
              </div>
            </dl>
          </div>
        }
      </div>
    );
  }
}

export default Card;
