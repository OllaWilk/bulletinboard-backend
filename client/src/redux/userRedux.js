/* selectors */
export const getUser = ({ user }) => user;

/* action name creator */
// const reducerName = 'User';
// const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
// const CHANGE_USER = createActionName('CHANGE_USER');

/* action creators */
// export const changeUser = payload => ({ payload, type: CHANGE_USER });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    default:
      return statePart;
  }
};