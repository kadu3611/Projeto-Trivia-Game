import React, { Component } from 'react';

class Stopwatch extends Component {
  constructor() {
    super();
    this.state = {
      timer: 0,
    };
  }

componentDidMount = () => {
  const TIME_LIMIT = 30000;
  this.timerID = setInterval(this.tick(), TIME_LIMIT);
}

tick = () => {
  this.setState((prev) => ({
    currentTime: prev.currentTime + 1,
  }));
}

render() {
  const { timer } = this.state;
  return (
    <p>
      {' '}
      {timer}
      {' '}
    </p>
  );
}
}

export default Stopwatch;
