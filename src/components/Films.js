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

    urls.forEach(async function(url) {
      let arrayFilms = [];
      await Api.getRequest(url, false)
        .then((result) => {
          arrayFilms = arrayFilms.concat(result);
        });
      
      this.setState({ films: arrayFilms });
      
    }.bind(this));
  }

  render() {
    const films = this.state.films;
    
    return(
      <React.Fragment>
        <dt>Films</dt>
        {
          films.length ?
            films.map((film) => 
              <dd key={film.episode_id}>{film.title}</dd>
            ) :
            <dd>None</dd> 
        }
      </React.Fragment>
    );
  }
}

export default Films;
