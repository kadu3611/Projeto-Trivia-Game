import React, { Component } from 'react';
import { DotWrapper, Dot } from './Loading.styles';

class Loading extends Component {
  render() {
    return (

      <DotWrapper>
        Loading
        {'   '}
        <Dot delay="0s" />
        <Dot delay=".1s" />
        <Dot delay=".2s" />
      </DotWrapper>
    );
  }
}
export default Loading;
