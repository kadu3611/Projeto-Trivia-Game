import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HeaderCSS } from './Hearder.styles';

class Header extends Component {
  render() {
    const { hashEmail, name, score } = this.props;
    return (
      <HeaderCSS>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="imagem Gravatar"
        />
        <p data-testid="header-player-name">
          {name}
        </p>
        <p>
          Pontuação:
          {' '}
          <span data-testid="header-score">
            {score}
          </span>
        </p>
      </HeaderCSS>
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
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
