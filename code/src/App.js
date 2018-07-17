import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import classes from './App.css';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Dashboard from './containers/Dashboard/Dashboard';
import CreateQuiz from './containers/CreateQuiz/CreateQuiz';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth'

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-quiz" component={CreateQuiz} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/auth" component={Auth} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
