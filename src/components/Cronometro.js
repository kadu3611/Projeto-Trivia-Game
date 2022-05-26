import React, { Component } from 'react';

class Cronometro extends Component {
  constructor() {
    super();
    this.state = {
      cronometro: 0,
    };
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
