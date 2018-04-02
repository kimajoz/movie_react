import React from 'react';
import { shallow } from 'enzyme';

import Index from '../Index';

describe('<ul id="allmovies" />', () => {
  it('should render an <ul> tag', () => {
    const renderedComponent = shallow(<Index />);
    expect(renderedComponent.type()).toEqual('ul');
  });

  it('should adopt a valid attribute id on h2 elem', () => {
    const id = 'id_0';
    const renderedComponent = shallow(<h2 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('the movie list has Pacific Rim: Uprising (2018) on it', () => {
    const id = 'id_0';
    const renderedComponent = shallow(<h2 id={id} />);
    expect(renderedComponent).toContain('Pacific Rim: Uprising (2018)');
  });

  it('should adopt a valid attribute src on img elem', () => {
    const image = 'https://ia.media-imdb.com/images/M/MV5BMjI3Nzg0MTM5NF5BMl5BanBnXkFtZTgwOTE2MTgwNTM@._V1_UX182_CR0,0,182,268_AL_.jpg';
    const title = 'Pacific Rim: Uprising (2018)';
    const renderedComponent = shallow(<img src={image} alt={title} />);
    expect(renderedComponent.prop('src')).toBeDefined();
  });

  it('the p has desc id', () => {
    const desc = 'desc';
    const renderedComponent = shallow(<p id={desc} />);
    expect(renderedComponent.prop('id')).toContain('desc');
  });
});
