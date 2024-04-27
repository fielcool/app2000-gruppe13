import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import OrgOverview from './OrgOverview';
import loginUser from './LoginUser';
import UserInfoFields from './UserInfoFields';

const App = () => {
  return (
    <Router>
      <Header showLogin showSignup />
      <Switch>
        <Route exact path="/" component={OrgOverview} />
        <Route path="/login" component={loginUser} />
        <Route path="/signup" component={UserInfoFields} />
      </Switch>
    </Router>
  );
};

export default App;
