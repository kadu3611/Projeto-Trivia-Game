import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createPlayer } from '../redux/actions';
import { getToken, saveToken } from '../services/localStorage';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      score: 0,
    };
  }

  /* componentDidMount = () => {
    addPlayer();
  } */

  verifyNameAndEmail = () => {
    const { name, email } = this.state;
    const verifyEmail = /[^A-Z][a-z0-9_\-.]+@+[^A-Z]+\.com/.test(email);
    const verifyName = name.length > 0;
    return !(verifyEmail && verifyName);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, score } = this.state;
    const { addPlayer, history } = this.props;
    const hashEmail = md5(email).toString();
    addPlayer({ name, hashEmail, score });
    if (getToken() !== null) {
      history.push('/game');
    } else {
      saveToken(await this.fetchAPIToken());
      history.push('/game');
    }
    history.push('/game');
  }

  fetchAPIToken = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const result = await response.json();
      const { token } = result;
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { name, email } = this.state;
    return (
      <main>
        <section>
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="player-name">
              Player Name
              <input
                id="player-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </label>
            <label htmlFor="player-email">
              Email
              <input
                id="player-email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </label>
            <button
              data-testid="btn-play"
              type="submit"
              disabled={ this.verifyNameAndEmail() }
            >
              Play
            </button>
          </form>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="submit"
            >
              Settings
            </button>
          </Link>
        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlayer: (status) => dispatch(createPlayer(status)),

});

Login.propTypes = {
  addPlayer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
