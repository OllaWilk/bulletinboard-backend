/* selectors */
export const getUser = ({ user }) => user;

/* action name creator */
const reducerName = 'User';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const CHANGE_USER = createActionName('CHANGE_USER');

const LOGIN = createActionName('LOGIN');
const LOGOFF = createActionName('LOGOFF');

/* action creators */
export const changeUser = payload => ({ payload, type: CHANGE_USER });

export const login = (payload) => ({ payload, type: LOGIN });
export const logoff = (payload) => ({ payload, type: LOGOFF });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {

    case LOGIN: {
      return {
        ...statePart,
        authenticated: true,
      };
    }

    case LOGOFF: {
      return {
        ...statePart,
        authenticated: false,
      };
    }

    default:
      return statePart;
  }
};