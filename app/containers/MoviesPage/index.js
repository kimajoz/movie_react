/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

export default class MoviesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }  
  fetchFirst(url) {
    var that = this;
    if (url) {
      fetch('http://localhost:3000/api/movies').then(function (response) {
        return response.json();
      }).then(function (result) {

        console.log(result);

        that.setState({ movies: result });

        console.log(that.state.movies);
	//document.getElementById('res').innerHTML = result[0].title;
	console.log();
	var lstmovies = [];
	result.map(elem => console.log(<li>{elem.title}</li>.props.children));
	result.map(elem => lstmovies += <li>{elem.title}</li>.props.children);
	document.getElementById('res').innerHTML = lstmovies;
	//console.log('so:' + );
	//console.log('so:' + 
	//Array.from(result.v	alues())
		//Array.from(result.keys()));
	//document.getElementById('res').innerHTML = so;

      });
    }
  }  
  componentDidMount() {

      this.fetchFirst("reactjs");

  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Movies Page</title>
          <meta name="description" content="Movies page of React.js Boilerplate application" />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <List>
          <ListItem>
            <ListItemTitle>
              <FormattedMessage {...messages.scaffoldingHeader} />
            </ListItemTitle>
            <p>
              <FormattedMessage {...messages.scaffoldingMessage} />
            </p>
          </ListItem>
        </List>
	<div id="res">
	  <ul>
            {this.state.movies.map(movies =>
              <li key={movies.id}>{movies.title}</li>
			//<img src={movies.movielink} />
            )}
          </ul>
	</div>
      </div>
    );
  }
}
