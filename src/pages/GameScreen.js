import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { removeToken, getToken } from '../services/localStorage';
import Loading from './Loading';
import { playAsseritions } from '../redux/actions/index';
import Cronometro from '../components/Cronometro';

// magic number
const SORT_WITH_NEGATIVE_NUMBERS = 0.5;

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      questionsResults: [],
      selectedAsk: {},
      alternatives: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    const APIdata = await this.fetchQuestions();

    if (APIdata.length === 0) {
      removeToken();
      history.push('/');
    } else {
      this.setState({
        questionsResults: APIdata,
        isLoading: false,
      });
      this.selectQuestion();
    }
  }

  fetchQuestions = async () => {
    try {
      const URL = `https://opentdb.com/api.php?amount=5&token=${getToken()}`;
      const response = await fetch(URL);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log(error.message);
    }
  };

  selectQuestion = () => {
    const { history } = this.props;
    const { questionsResults } = this.state;

    const questionsData = [...questionsResults];

    if (questionsData.length > 0) {
      const choosedQuestion = questionsData[0];

      const filteredQuestions = questionsData
        .filter((question) => question.correct_answer !== choosedQuestion.correct_answer);

      const answers = [
        ...choosedQuestion.incorrect_answers,
        choosedQuestion.correct_answer,
      ].sort(() => Math.random() - SORT_WITH_NEGATIVE_NUMBERS);

      this.setState({
        selectedAsk: choosedQuestion,
        alternatives: answers,
        questionsResults: filteredQuestions,
      });
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { selectedAsk, isLoading, alternatives, currentTime } = this.state;
    const { newScore } = this.props;
    if (isLoading) {
      return (
        <>
          <Header />
          <Loading />
        </>
      );
    }
    return (
      <>
        <Header />
        <Cronometro />
        <main>
          <section>
            <p>{currentTime}</p>
            <p data-testid="question-category">{selectedAsk.category}</p>
            <p data-testid="question-text">{selectedAsk.question}</p>
          </section>
          <section
            data-testid="answer-options"
          >
            {
              alternatives.map((answer, index) => (
                answer === selectedAsk.correct_answer ? (
                  <button
                    key={ answer }
                    type="button"
                    onClick={ () => newScore() }
                    data-testid="correct-answer"
                  >
                    { answer }
                  </button>
                ) : (
                  <button
                    key={ answer }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                  >
                    { answer }
                  </button>
                )
              ))
            }
            <button
              type="button"
              onClick={ this.selectQuestion }
              data-testid="btn-next"
            >
              Next
            </button>
          </section>
        </main>
      </>
    );
  }
}

GameScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  newScore: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  newScore: (score) => dispatch(playAsseritions(score)),
});

export default connect(null, mapDispatchToProps)(GameScreen);
