import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from './pages/Login';
import './App.css';
import GameScreen from './pages/GameScreen';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

const ComponentGlobal = createGlobalStyle`
* {
    padding: 0px;
    font-family: sans-serif;
    margin: 0px;
    border: 10px, solid, black;
}`;

export default function App() {
  return (
    <div>
      <ComponentGlobal />

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ GameScreen } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
