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

export default class MoviesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }
  componentDidMount() {
    this.fetchFirst('firstload');
  }
  shouldComponentUpdate() { // To allow change states
    return true;
  }
  fetchFirst(url) {
    const movie = [];
    function printMovieId(element, index) {
      movie[index] = '<ul id=allmovies>';
      movie[index] += `<div><h2 id=id_${element.id}>${element.title}</h2> by <a href=# class=director>${element.director}</a></div>`;
      movie[index] += `<a href=# dangerouslySetInnerHTML={...element} id=a_${element.id} alt=${element.title}><img src=${element.image} alt=${element.title}/>`;
      movie[index] += `<div><a href=${element.movielink}>${element.movielink}</a></div>`;
      movie[index] += `<p id=desc>${element.desc}</p>`;
      movie[index] += '</ul>';
      document.getElementById('res').innerHTML = movie;
    }

    if (url) {
      fetch('http://localhost:3000/api/movies')
        .then((response) => response.json())
        .then((result) => result.forEach(printMovieId));
    }
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
        </div>
      </div>
    );
  }
}
