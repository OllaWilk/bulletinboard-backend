//import posts from '../db/db.json';

export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    id: '1',
    rights: 'admin',
    authenticated: true,
  },
};
