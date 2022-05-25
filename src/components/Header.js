import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { hashEmail, name, score } = this.props;
    // https://www.gravatar.com/avatar/${hash-gerada}
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="imagem Gravatar"
        />
        <p data-testid="header-player-name">
          {name}
        </p>
        <p data-testid="header-score">
          { `Pontuação: ${score}` }
        </p>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    hashEmail: state.player.gravatarEmail,
    name: state.player.name,
    score: state.player.score,
  };
}
Header.propTypes = {
  hashEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
