// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { EXCHANGE_FAILURE,
  EXCHANGE_SUCCESS,
  EXCHANGE_CURRENCY,
  REQUEST_SPECIFIC,
  REQUEST_SPECIFIC_FAILURE,
  REQUEST_SPECIFIC_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  cotacao: {},
  specific: {},
};

function Wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SECOND_ACTION':
    return { state: action.state };
  case EXCHANGE_CURRENCY:
    return {
      ...state,
    };
  case EXCHANGE_SUCCESS:
    return {
      ...state,
      currencies: action.data,
    };
  case EXCHANGE_FAILURE:
    return {
      ...state,
      error: action.error,
    };

  case 'NEW_ACTION_DESPESAS':
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };

  case REQUEST_SPECIFIC:
    return {
      ...state,
      type: action.type,
    };

  case REQUEST_SPECIFIC_SUCCESS:
    return {
      ...state,
      specific: action.dataspec,
    };

  case REQUEST_SPECIFIC_FAILURE:
    return {
      ...state,
      type: action.type,
      error: action.error,
    };

  default:
    return state;
  }
}
export default Wallet;
