import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      feedBackScore: '',
    };
  }

  componentDidMount = () => {
    this.testScore();
  }

  testScore = () => {
    const { assertions } = this.props;
    const scoreNumber = assertions;
    const TREE = 3;
    if (scoreNumber < TREE) {
      this.setState({
        feedBackScore: 'Could be better...',
      });
    } else if (scoreNumber >= TREE) {
      this.setState({
        feedBackScore: 'Well Done!',
      });
    }
  }

  clickPlay = () => {
    const { history } = this.props;
    history.push('/');
  }

  clickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { feedBackScore } = this.state;
    const { score, assertions } = this.props;
    return (
      <main>
        <Header />
        <p>
          Feedback score:
          {' '}
          <span data-testid="feedback-text">{ feedBackScore }</span>
        </p>
        <p>
          Score Total:
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p>
          Total question:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.clickPlay }
        >
          Play Again

        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.clickRanking }
        >
          Ranking

        </button>
      </main>
    );
  }
}
function mapStateToProps(state) {
  return {
    score: state.player.score,
    assertions: state.player.assertions,
  };
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps)(Feedback);
// Play Again
// assertions: PropTypes.number.isRequired,
