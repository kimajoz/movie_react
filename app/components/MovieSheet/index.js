import React from 'react';
import PropTypes from 'prop-types';

function MovieSheet(props) {
  return (
    <div className="MovieSheet">
      <div className="MS_Header">
        <h2 id={props.id}>{props.title}</h2> by <a className="MS_director">{props.director}</a>
      </div>
      <div className="MS_Img">
        <a id="a_{props.id}" alt={props.title}>
          <img src={props.image} alt={props.title} />
        </a>
      </div>
      <div className="MS_Link">
        <a href={props.movielink}>{props.movielink}</a>
      </div>
      <p className="MS_Desc">{props.desc}</p>
    </div>
  );
}

MovieSheet.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  director: PropTypes.string,
  image: PropTypes.string,
  movielink: PropTypes.string,
  desc: PropTypes.string,
};

export default MovieSheet;
