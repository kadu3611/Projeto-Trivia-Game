import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { removeToken, getToken } from '../services/localStorage';
import Loading from './Loading';
import '../App.css';

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
      buttonNext: false,
      clicked: false,
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
        clicked: false,
        buttonNext: false,
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

  render() {
    const { selectedAsk, isLoading, alternatives, clicked, buttonNext } = this.state;
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
        <main>
          <section>
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
                    data-testid="correct-answer"
                    onClick={ this.onClickFun }
                    className={ clicked && 'green' }
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
};

export default GameScreen;
