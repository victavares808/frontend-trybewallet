import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { newAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    const { dispatchState } = this.props;
    const numberSix = 6;
    return (
      <>
        <input
          name="email"
          onChange={ this.handleChange }
          type="text"
          data-testid="email-input"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={ this.handleChange }
          type="password"
          data-testid="password-input"
          placeholder="password"
        />
        <Link to="/carteira">
          <button
            disabled={ !(email
              .includes('@email.com') && password.length >= numberSix) }
            onClick={ () => dispatchState(email) }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchState: (state) => dispatch(newAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchState: PropTypes.func.isRequired,
};
