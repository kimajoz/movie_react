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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestApiData } from './actions';

class MoviesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
      this.props.requestApiData();
      console.log(this.props.data);
  }

  movies = (x, i) =>
    <div key={x.id}>
      <h1>{x.title}</h1>
      <h1>{x.director}</h1>
      <img src={x.image}/>
      <h1>{x.desc}</h1>
      <h1>{x.movielink}</h1>
    </div>;

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
      {(this.props.data || []).map(this.movies)}
    </ul>
	</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);



