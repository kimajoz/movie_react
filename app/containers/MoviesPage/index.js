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
    };
  }
  componentDidMount() {
    this.fetchFirst('firstload');
  }
  shouldComponentUpdate() { // To allow change states
    return true;
  }
  fetchFirst(url) {
    var that = this;
    if (url) {
      fetch('http://localhost:3000/api/movies')
        .then((response) => response.json())
        .then((result) => that.setState({ movies: result }));
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
	{ /*JSON.stringify(this.state.movies)*/ }
	{ Array.from(this.state.movies.values()).map( (res) =>
	 (<MovieSheet
		id={res.id}
		title={res.title}
		director={res.director}
		image={res.image}
		movielink={res.movielink}
		desc={res.desc}
	/>)
	) }
      </div>
    );
  }
}
