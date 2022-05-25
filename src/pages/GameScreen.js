import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';
import { removeToken, getToken } from '../services/localStorage';

// magic number
const EXPIRED_TOKEN = 3;
const SORT_WITH_NEGATIVE_NUMBERS = 0.5;

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      questionsData: [],
      selectedAsk: {},
      alternatives: [],
    };
  }

  async componentDidMount() {
    const { dispatch, history } = this.props;

    this.setState({
      isLoading: true,
    });

    const verifyExpiredToken = await this.checkExpiredToken();

    if (verifyExpiredToken) {
      removeToken();
      history.push('/');
    } else {
      this.setState({
        questionsData: await dispatch(fetchQuestions()),
        isLoading: false,
      });
    }

    this.selectQuestion();
  }

  selectQuestion = () => {
    const { history } = this.props;
    const { questionsData } = this.state;
    console.log('state original', questionsData);
    const choosedQuestion = questionsData[0];
    const answers = [
      ...choosedQuestion.incorrect_answers,
      choosedQuestion.correct_answer,
    ].sort(() => Math.random() - SORT_WITH_NEGATIVE_NUMBERS);
    if (questionsData.length > 0) {
      this.setState((prevState) => ({
        selectedAsk: choosedQuestion,
        alternatives: answers,
        questionsData: prevState.questionsData
          .filter((question) => question !== choosedQuestion),
      }));
    } else {
      history.push('/feedback');
    }
  }

  checkExpiredToken = async () => {
    try {
      const URL = `https://opentdb.com/api.php?amount=5&token=${getToken()}`;
      const response = await fetch(URL);
      const data = await response.json();
      if (data.response_code === EXPIRED_TOKEN) return true;
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { selectedAsk, isLoading, alternatives } = this.state;
    console.log(selectedAsk);
    if (isLoading) {
      return (
        <>
          <Header />
          <p>CARREGANDO...</p>
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
            >
              Próxima Pergunta
            </button>
          </section>
        </main>
      </>
    );
  }
}

GameScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(GameScreen);
