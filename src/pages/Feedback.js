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
    const { score } = this.props;
    const scoreNumber = score;
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

  render() {
    const { feedBackScore } = this.state;
    const { score, assertions } = this.props;
    return (
      <main>
        <Header />
        <p data-testid="feedback-text">
          Feedback score:
          {' '}
          { feedBackScore }
        </p>
        <p data-testid="feedback-total-score">
          Score Total:
          {score}
        </p>
        <p data-testid="feedback-total-question">
          Total question:
          {' '}
          {assertions}
        </p>
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
};
export default connect(mapStateToProps)(Feedback);
