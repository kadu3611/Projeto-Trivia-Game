import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { removeToken, getToken } from '../services/localStorage';
import Loading from './Loading';
import { increaseAssertions } from '../redux/actions/index';

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
      seconds: 30,
      button: false,
      difficulty: 0,
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
    this.minhaVariavelInterval();
  }

  minhaVariavelInterval = () => {
    const ONE_SECOND = 1000;
    setInterval(() => {
      const { seconds } = this.state;
      this.setState((prevState) => ({
        seconds: prevState.seconds === 0 ? 0 : prevState.seconds - 1,
        button: seconds === 0,
      }));
    }, ONE_SECOND);// ONE_SECOND é o quanto ele quer contar por vez
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

      let valor = 0;
      const TREE = 3; // MagicNumber
      if (choosedQuestion.difficulty === 'hard') {
        valor = TREE;
      } else if (choosedQuestion.difficulty === 'medium') {
        valor = 2;
      } else {
        valor = 1;
      }

      this.setState({
        selectedAsk: choosedQuestion,
        alternatives: answers,
        questionsResults: filteredQuestions,
        seconds: 30,
        difficulty: valor,
      });
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { selectedAsk, isLoading, alternatives,
      currentTime, seconds, button, difficulty } = this.state;
    const secodsAndDifficulty = { seconds, difficulty };
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
                    onClick={ () => newScore(secodsAndDifficulty) }
                    data-testid="correct-answer"
                    disabled={ button }
                  >
                    { answer }
                  </button>
                ) : (
                  <button
                    key={ answer }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    disabled={ button }
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
  newScore: (secodsAndDifficulty) => dispatch(increaseAssertions(secodsAndDifficulty)),
});

export default connect(null, mapDispatchToProps)(GameScreen);
