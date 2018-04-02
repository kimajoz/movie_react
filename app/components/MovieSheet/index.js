import React from 'react';

function MovieSheet(props) {
  return (
    <div className="MovieSheet">
      <div className="MS_Header">
	<h2 id={props.id}>{props.title}</h2> by <a href="#" class="MS_director">{props.director}</a>
      </div>
      <div id="MS_Img">
      	<a href="#" id="a_{props.id}" alt={props.title}>
		<img src={props.image} alt={props.title}/>
	</a>
      </div>
      <div id="MS_Link">
	<a href={props.movielink}>{props.movielink}</a>
      </div>
      <p id="MS_Desc">{props.desc}</p>
     </div>
  );
}

export default MovieSheet;
