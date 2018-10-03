import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Auth from './Components/Auth';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
            {/* <Route path="/forgotpassword/:token" exact component={ForgotPassword} /> */}
            {/* <Route path="/verifyaccount" exact component={Auth} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
