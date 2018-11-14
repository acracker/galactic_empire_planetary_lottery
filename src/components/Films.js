import React, { Component } from 'react';
import Api from '../services/Api';

class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
    }
  }

  componentDidMount() {
    const urls = this.props.urls;
    
    let arrayFilms = [];
    urls.forEach(async function(url) {
      await Api.getRequest(url, false)
        .then((result) => {
          arrayFilms = arrayFilms.concat(result);
        })
        .then(() => {
          this.setState({ films: arrayFilms });
        });
    }.bind(this));
  }

  render() {
    const films = this.state.films;
    
    return(
      <React.Fragment>
        <dt>Films</dt>
        <div className="card__inner-row">
          {
            films.length ?
              films.map((film) => 
                <dd key={film.episode_id}>{film.title}</dd>
              ) :
              <dd>None</dd> 
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Films;
