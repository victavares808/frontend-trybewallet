import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import exchangeData from '../ExchangeApi';
import { fetchExchangeApi, fetchMoneyApi2, newActionDispesas } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      tag: 'Alimentação',
      /*  exchangeRates: {}, */
      method: 'Dinheiro',
    };
  }

  async componentDidMount() {
    const { receive } = this.props;
    await receive();
    /*    await exchangeData().then((response) => this.setState({ exchangeRates: response })); */
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { value, description, currency, tag, method } = this.state;
    const exRatesApi = await exchangeData();
    const { expenses, data } = this.props;
    const findLength = data.expenses.length
      ? data.expenses[data.expenses.length - 1].id + 1 : 0;

    const objectKeys = {
      id: findLength,
      value,
      description,
      currency,
      tag,
      exchangeRates: exRatesApi,
      method,
    };
    expenses(objectKeys);
    this.setState({ value: 0 });
    console.log(data);
  }

  render() {
    const { email: { user: { email } },
      data: { currencies, expenses } } = this.props;
    const { description, value } = this.state;
    return (
      <div>
        <div>TrybeWallet</div>
        <div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            { expenses.reduce((previousValue, currentValue) => (
              previousValue
               + parseFloat(currentValue.exchangeRates[currentValue.currency]
                 .ask * Number(currentValue.value))
            ), 0).toFixed(2)}
            {/* https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce  */}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div>
          <input
            onChange={ this.handleChange }
            name="value"
            type="number"
            value={ value }
            data-testid="value-input"
            placeholder="Valor da despesa"
          />
          <input
            onChange={ this.handleChange }
            name="description"
            value={ description }
            type="text"
            data-testid="description-input"
            placeholder="Descrição das despesas"
          />
          <label name="moeda" htmlFor="Moeda">
            Moeda
            <select
              name="currency"
              onChange={ this.handleChange }
              id="Moeda"
              data-testid="currency-input"
            >
              {
                currencies.map((element, index) => (
                  <option
                    key={ index }
                  >
                    { element }
                  </option>
                ))
              }
            </select>
          </label>
          <select
            onChange={ this.handleChange }
            name="method"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            onChange={ this.handleChange }
            name="tag"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            onClick={ this.handleClick }
            type="button"
          >
            Adicionar despesa
          </button>
        </div>
        <table border="1">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          { expenses.map((element, index) => (
            <tr key={ index }>
              <td>
                {element.description}
              </td>
              <td>
                {element.tag}
              </td>
              <td>
                {element.method}
              </td>
              <td>
                {parseFloat(element.value).toFixed(2)}
              </td>
              <td>
                {element.exchangeRates[element.currency].name.split('/')[0]}
              </td>
              <td>
                {parseFloat(element.exchangeRates[element.currency].ask).toFixed(2)}
              </td>
              <td>
                {parseFloat(element.exchangeRates[element.currency].ask)
                * parseFloat(element.value)}
              </td>
              <td>Real</td>
              <td>Editar/Excluir</td>
            </tr>
          ))}
        </table>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state,
  data: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  receive: () => dispatch(fetchExchangeApi()),
  receive2: (state) => dispatch(fetchMoneyApi2(state)),
  expenses: (state) => dispatch(newActionDispesas(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  receive: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
  currencies: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};
