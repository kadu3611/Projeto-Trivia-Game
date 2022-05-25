import React, { Component } from 'react';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <main>
        <Header />
        <h1 data-testid="ranking-title">
          Teste ranking
          {' '}
        </h1>

      </main>
    );
  }
}
export default Ranking;
