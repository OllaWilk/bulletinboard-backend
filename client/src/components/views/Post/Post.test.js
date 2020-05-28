import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';


const mockProps = {
  post: {
    id: '1',
  },
  user: {
    authenticated: true,
    id: '1a',
  },
};

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
