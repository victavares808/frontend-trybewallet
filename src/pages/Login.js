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
      validateButton: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => this.handleValidation());
    /* toda vez que houver mudança de estado na linha 20 será rodada handleVlaidation */
  }

  handleValidation = () => {
    const { email, password } = this.state;
    const numberSix = 6;
    const emailConfirmation = email.match(/\S+@\S+\.\S+/);
    const passwordValidation = password.length;
    if (emailConfirmation && passwordValidation >= numberSix) {
      this.setState({ validateButton: false });
    } else {
      this.setState({ validateButton: true });
    }
  }

  render() {
    const { email, password, validateButton } = this.state;
    const { dispatchState } = this.props;
    return (
      <>
        <input
          name="email"
          value={ email }
          onChange={ this.handleChange }
          type="text"
          data-testid="email-input"
          placeholder="Email"
        />
        <input
          name="password"
          value={ password }
          onChange={ this.handleChange }
          type="password"
          data-testid="password-input"
          placeholder="password"
        />
        <Link to="/carteira">
          <button
            disabled={ validateButton }
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
