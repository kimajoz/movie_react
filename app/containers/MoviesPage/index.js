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
  
  fetchMovieId(id) {
    var that = this;
   
    function logArrayElements(element, index, array) {
      //console.log('i[' + index + '] = ' + element);
      //element.forEach(logArrayElements);
	Object.keys(element).forEach(function(key) {
  		//var value = element[key];
  		//console.log(element[key]);
		//movie += "<li>{element['id']}</li>";
		var movie = [];
		movie += '<li>';
		//movie += [{element['title']}];
		movie += '</li>';
  		console.log('id:' + element['id']);
  		console.log('title:' + element['title']);
  		console.log('movie:' + movie);
	});
	document.getElementById('res').innerHTML = movie;
    }

   if (id) {
      fetch('http://localhost:3000/api/movies:' + id).then(function (response) {
        return response.json();
      }).then(function (result) {
        console.log(result);
        that.setState({ movies: result });
        console.log(that.state.movies);
	//console.log(result.forEach(logArrayElements));
      });
    }
  }

  fetchFirst(url) {
    var that = this;

    var movie = [];
    function printMovieId(element, index, array) {
      //console.log('i[' + index + '] = ' + element);
        movie[index] = '<ul>';
	movie[index] += '<div><h2 id=id_' + element['id'] + '>' + element['title'] + '</h2> by <a href=\'#\' class=director>' + element['director'] + '</a></div>';
	movie[index] += '<img src=' + element['image'] + '/>';
	movie[index] += '<div><a href=' + element['movielink'] + '>' + element['movielink'] + '</a></div>';
	movie[index] += '<p id=desc>' + element['desc'] + '</p>';
	Object.keys(element).forEach(function(key) {
  		//var value = element[key];
  		//console.log(element[key]);
		movie[index] += '<li>' + element[key] + '</li>';
		//movie[index] += '<li>' + element['id'] + '</li>';
		//movie[index] += '<li>' + element['title'] + '</li>';
  		//console.log('id:' + element['id']);
  		//console.log('title:' + element['title']);
	});
	movie[index] += '</ul>';
  	console.log('movie:' + movie);
	document.getElementById('res').innerHTML = movie;
    }
    
    if (url) {
      fetch('http://localhost:3000/api/movies').then(function (response) {
        return response.json();
      }).then(function (result) {
	result.forEach(printMovieId);
      });
    }
  }  
  componentDidMount() {
      this.fetchFirst("reactjs");
      //this.fetchMovieId(1);
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
