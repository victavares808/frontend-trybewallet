// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {};

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'NEW_ACTION':
    return {
      email: action.state,
    };
  default:
    return state;
  }
}

export default users;
