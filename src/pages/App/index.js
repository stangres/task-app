import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {RedirectRoute } from '../../helpers/routes';
import AppNotification from '../../components/AppNotification';
import MainContainer from '../../components/MainContainer';
import Login from '../../components/Login';
import Home from '../Home';
import 'semantic-ui-css/semantic.min.css';
import './style.scss';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <AppNotification/>
        <Login/>
        <MainContainer>
          <Routes/>
        </MainContainer>
      </div>
    </Router>
  );
};

function Routes() {
    return (
      <Switch>
        <Route path="/">
          <Home/>
        </Route>
        <RedirectRoute/>
      </Switch>
    );
}

export default App;