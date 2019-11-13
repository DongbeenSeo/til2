import React from 'react';
import { render } from '@testing-library/react';
import Profile from './Profile';

describe('<Profile/>', () => {
  it('matches snapshot', () => {
    const utils = render(<Profile usename="dongbeen" name="서동빈" />);
    // const utils = render()
    expect(utils.container).toMatchSnapshot();
  });
  it('shows the props correctly', () => {
    const utils = render(<Profile usename="dongbeen" name="서동빈" />);
    utils.getByText(/dongbeen/);
    utils.getByText(/서동빈/);
    utils.getByText(/서/);
  });
});
