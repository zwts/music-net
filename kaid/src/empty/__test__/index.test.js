import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Empty from '../index';

describe('<Empty />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Empty>This page is empty, empty message here</Empty>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
