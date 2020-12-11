import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../index';

describe('<Header />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Header>KaiOS header</Header>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
