import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';


const mockProps = {
  user: {
    authenticated: false,
  },
  posts: [
    { _id: '1',
      title: 'title',
      location: 'Lorem',
      image: 'http://dddd.jpg',
      published: 'now',
    },
  ],
  fetchAllPosts: () => console.log('func'),

};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps} />);    expect(component).toBeTruthy();
    expect(component).toBeTruthy();
  });
});
