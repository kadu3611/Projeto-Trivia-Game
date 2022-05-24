import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

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

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('teste');
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
        </section>
      </main>
    );
  }
}

export default Login;
