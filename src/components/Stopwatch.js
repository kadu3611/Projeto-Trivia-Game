import React, { Component } from 'react';

class Stopwatch extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.minhaVariavelInterval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds === 0 ? 0 : prevState.seconds - 1,
      }));
    }, ONE_SECOND); // ONE_SECOND é o quanto ele quer contar por vez
  }

  render() {
    const { seconds } = this.state;
    return (
      <section className="timer">
        <h1>Time</h1>
        <h2>{seconds}</h2>
      </section>
    );
  }
}

export default Stopwatch;
