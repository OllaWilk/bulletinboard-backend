import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAll = ({ posts }) => posts.data.sort(
  (a, b) => Date.parse(a.published) - Date.parse(b.published)).reverse();


export const getPostById = ({ posts }, postId) => {
  const filteredPost = posts.data.filter(post => post._id === postId);
  return filteredPost.length ? filteredPost[0] : { error: true };
};

export const getMyAds = ({ posts, user }) => {
  const usersPost = posts.data.filter(post => post.userId === user.id)
  .sort( (a, b) => Date.parse(a.published) - Date.parse(b.published)).reverse();
  return usersPost;
};

/* action name creator */
const reducerName = 'post';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');


/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
export const editPost = payload => ({ payload, type: EDIT_POST });

/* thunk creators */

export const fetchAllPosts = () => {
  return async dispatch => {

    dispatch(fetchStarted());
    try {
      let res = await axios.get(`${API_URL}/posts`);
      dispatch(fetchSuccess(res.data));
    } catch(err) {
      dispatch(fetchError(err.message || true));
    }
  };
};


export const addPostRequest = (data) => {
  return async dispatch => {

    dispatch(fetchStarted());
    try {
      let res = await axios.post( `${API_URL}/post/add`, data);
      dispatch(addPost(res.data));
    } catch(err) {
      dispatch(fetchError(err.message || true));
    }
  };
};


export const updatePostRequest = (id, data) => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.put(`${API_URL}/posts/${id}`, data );
      dispatch(editPost(res.data));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {

  console.log(':##: statePart', statePart);
  console.log(':@: action', action);

  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, { ...action.payload }],
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case EDIT_POST: {
      console.log(":#:", action.payload);
      return {
        ...statePart,
        data: statePart.data.map(post => {
          return ( post._id === action.payload._id ? {...action.payload} : post);
        }),
      };
    }
    default:
      return statePart;
  }
};
