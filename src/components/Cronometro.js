import React, { Component } from 'react';

class Stopwatch extends Component {
  constructor() {
    super();
    this.state = {
      cronometro: 0,
    };
  }

componentDidMount = () => {
  const TREZENTOS_MILESSEGUNDOS = 300;
  this.timerID = setInterval(this.tick(), TREZENTOS_MILESSEGUNDOS);
}

tick = () => {
  this.setState((prev) => ({
    currentTime: prev.currentTime + 1,
  }));
}

render() {
  const { cronometro } = this.state;
  return (
    <p>
      {' '}
      {cronometro}
      {' '}
    </p>
  );
}
}

export default Cronometro;
