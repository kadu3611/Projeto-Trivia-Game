import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from './pages/Login/Login';
import './App.css';
import GameScreen from './pages/GameScreen/GameScreen';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback/Feedback';
import Ranking from './pages/Ranking';
import Loading from './pages/Loading/Loading';

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
        <Route exact path="/loading" component={ Loading } />
      </Switch>
    </div>
  );
}
