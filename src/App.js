import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
// import logo from './trivia.png';
import './App.css';
import GameScreen from './pages/GameScreen';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ GameScreen } />
    </Switch>
  );
}
