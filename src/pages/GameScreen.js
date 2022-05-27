import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { removeToken, getToken } from '../services/localStorage';
import Loading from './Loading';
import { increaseAssertions } from '../redux/actions';
import './GameScreen.css';

// magic number
const SORT_WITH_NEGATIVE_NUMBERS = 0.5;
const ONE_SECOND = 1000;
const THREE = 3; // MagicNumber

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      questionsResults: [],
      selectedAsk: {},
      alternatives: [],
      buttonNext: false,
      clicked: false,
      seconds: 30,
      button: false,
      multiplier: 0,
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
    this.stopwatch();
  }

  componentWillUnmount = () => {
    clearInterval(this.stopwatch);
  }

  stopwatch = () => {
    setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds === 0 ? 0 : prevState.seconds - 1,
        button: prevState.seconds === 0,
      }));
    }, ONE_SECOND);
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

      let questionMultiplier = 0;
      if (choosedQuestion.difficulty === 'hard') {
        questionMultiplier = THREE;
      } else if (choosedQuestion.difficulty === 'medium') {
        questionMultiplier = 2;
      } else {
        questionMultiplier = 1;
      }

      this.setState({
        selectedAsk: choosedQuestion,
        alternatives: answers,
        questionsResults: filteredQuestions,
        clicked: false,
        buttonNext: false,
        seconds: 30,
        multiplier: questionMultiplier,
      });
    } else {
      history.push('/feedback');
    }
  }

  onClickFun = () => {
    this.setState({
      clicked: true,
      buttonNext: true,
    });
  }

  sendScore = () => {
    const { seconds, multiplier } = this.state;
    const { newScore } = this.props;
    newScore({ seconds, multiplier });
    this.setState({
      clicked: true,
      buttonNext: true,
    });
  }

  render() {
    const { selectedAsk, isLoading, alternatives,
      currentTime, seconds, button, clicked, buttonNext } = this.state;

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
        <p>
          Time:
          {' '}
          <span>{seconds}</span>
        </p>
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
                    onClick={ this.sendScore }
                    data-testid="correct-answer"
                    className={ clicked && 'green' }
                    disabled={ button }
                  >
                    { answer }
                  </button>
                ) : (
                  <button
                    key={ answer }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ this.onClickFun }
                    className={ clicked && 'red' }
                    disabled={ button }
                  >
                    { answer }
                  </button>
                )
              ))
            }
            { buttonNext && (
              <button
                type="button"
                onClick={ this.selectQuestion }
                data-testid="btn-next"
              >
                Next
              </button>
            )}
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
  newScore: (scoreData) => dispatch(increaseAssertions(scoreData)),
});

export default connect(null, mapDispatchToProps)(GameScreen);
