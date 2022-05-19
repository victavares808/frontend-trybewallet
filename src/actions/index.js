// Coloque aqui suas actions
import exchangeData, { moneySpecific } from '../ExchangeApi';

export const newAction = (state) => ({
  type: 'NEW_ACTION',
  state,
});

export const newActionDispesas = (state) => ({
  type: 'NEW_ACTION_DESPESAS',
  state,
});

export const EXCHANGE_CURRENCY = 'EXCHANGE_CURRENCY';
export const EXCHANGE_SUCCESS = 'REQUEST_MONEY_SUCCESS';
export const EXCHANGE_FAILURE = 'RECEIVE_MONEY_FAILURE';

export const exchangeRequest = () => ({
  type: EXCHANGE_CURRENCY,
});

export const exchangeApproved = (exchangeApi) => ({
  type: EXCHANGE_SUCCESS,
  data: Object.keys(exchangeApi).filter((element) => element !== 'USDT'),
  dataComplete: exchangeApi,
});

export const exchangeDisapproved = (error) => ({
  type: EXCHANGE_FAILURE,
  error,
});

export function fetchExchangeApi() {
  return async (dispatch) => {
    dispatch(exchangeRequest());
    try {
      const request = await exchangeData();
      dispatch(exchangeApproved(Object.keys(request)
        .filter((element) => element !== 'USDT')));
    } catch (error) {
      dispatch(exchangeDisapproved(error));
    }
  };
}

export const REQUEST_SPECIFIC = 'REQUEST_SPECIFIC';
export const REQUEST_SPECIFIC_SUCCESS = 'REQUEST_SPECIFIC_SUCCESS';
export const REQUEST_SPECIFIC_FAILURE = 'REQUEST_SPECIFIC_FAILURE';

export const requestSpecific = () => ({
  type: REQUEST_SPECIFIC,
});

export const requestSpecificSuccess = (dados) => ({
  type: REQUEST_SPECIFIC_SUCCESS,
  dataspec: dados,
});

export const requestSpecificFailure = (error) => ({
  type: REQUEST_SPECIFIC_FAILURE,
  error,
});

export function fetchMoneyApi2(moeda) {
  return async (dispatch) => {
    dispatch(requestSpecific());
    try {
      const request = await moneySpecific(moeda);
      dispatch(requestSpecificSuccess(request));
    } catch (error) {
      dispatch(exchangeDisapproved(error));
    }
  };
}
