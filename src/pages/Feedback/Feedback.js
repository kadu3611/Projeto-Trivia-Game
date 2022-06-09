import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MainCSSFeedback, PCSS, DivCSS, ButtonCSS } from './Feedback.styles';
import Header from '../../components/Header/Header';

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
      <MainCSSFeedback>
        <Header />
        <DivCSS>
          <PCSS>
            Feedback score:
            {' '}
            <span data-testid="feedback-text">{ feedBackScore }</span>
          </PCSS>
          <PCSS>
            Score Total:
            <span data-testid="feedback-total-score">{ score }</span>
          </PCSS>
          <PCSS>
            Total question:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </PCSS>

          <ButtonCSS
            data-testid="btn-play-again"
            type="button"
            onClick={ this.clickPlay }
          >
            Play Again

          </ButtonCSS>
          <ButtonCSS
            data-testid="btn-ranking"
            type="button"
            onClick={ this.clickRanking }
          >
            Ranking

          </ButtonCSS>
        </DivCSS>
      </MainCSSFeedback>
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
