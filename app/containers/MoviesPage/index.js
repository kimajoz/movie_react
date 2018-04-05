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
import MovieSheet from '../../components/MovieSheet';

export default class MoviesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      count: 0,
      len: 0,
    };
    this.incrementCounter = this.updateCounter.bind(this, 1);
    this.decrementCounter = this.updateCounter.bind(this, -1);
  }
  componentDidMount() {
    this.fetchFirst('firstload');
  }
  shouldComponentUpdate() { // To allow change states
    return true;
  }
  fetchFirst(url) {
    if (url) {
      fetch('http://localhost:3000/api/movies')
        .then((response) => response.json())
        .then((result) => this.setState({ movies: result, len: result.length }));
    }
  }
  fetchIdMovie(id) {
    if (Number.isInteger(id)) {
      fetch('http://localhost:3000/api/movies/' + id)
        .then((response) => response.json())
        .then((result) => this.setState({ movies: result }));
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
        { /* JSON.stringify(this.state.movies) */ }
	<div>
                <div>{this.state.count}</div>
                <input type='button' value='-' onClick={this.decrementCounter} />
                <input type='button' value='+' onClick={this.incrementCounter} />
	</div>
        { Array.from(this.state.movies.values()).map((res) =>
(<MovieSheet
  key={res.id}
  id={res.id}
  title={res.title}
  desc={res.desc}
  director={res.director}
  image={res.image}
  movielink={res.movielink}
/>)
) }
      </div>
    );
  }

  updateCounter(count) {
	let nc = this.state.count + count;  
	if (nc >= 0 && nc < this.state.len)
        	this.setState({count: nc}, () => this.fetchIdMovie(this.state.count));
  }
}
