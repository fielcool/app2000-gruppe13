import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import OrgOverview from './OrgOverview';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const App = () => {
  return (
    <Router>
      <Header showLogin showSignup />
      <Switch>
        <Route exact path="/" component={OrgOverview} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Switch>
    </Router>
  );
};

export default App;
