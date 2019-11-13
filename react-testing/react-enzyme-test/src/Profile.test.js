import React from 'react';
import { mount } from 'enzyme';
import Profile from './Profile';

describe('<Profile/>', () => {
  it('matches snapshot', () => {
    const wrapper = mount(<Profile username="dongbeen" name="서동빈" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders usename and name', () => {
    const wrapper = mount(<Profile username="dongbeen" name="서동빈" />);
    console.log(`${JSON.stringify(wrapper.props())}`);
    expect(wrapper.props().username).toBe('dongbeen');
    expect(wrapper.props().name).toBe('서동빈');

    const boldElement = wrapper.find('b');
    expect(boldElement.contains('dongbeen')).toBe(true);
    const spanElement = wrapper.find('span');
    expect(spanElement.text()).toBe('(서동빈)');
  });
});
