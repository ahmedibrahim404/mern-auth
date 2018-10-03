import React , { Component } from 'react';
import '../styles/Auth.css';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { mapDispatchToProps } from '../reduxState';
import { checkAuth } from '../api';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';

class Auth extends Component {

  constructor(props){
    super(props);
      super();
      checkAuth().then(( data ) => data.json() ).then(( data ) => {
        if(data.success == true){
          this.props.onUserLogin(data.username);
          this.props.history.push('/')
        } else {
          localStorage.removeItem('authToken');
        }
      })
  
    this.state = {
      height:'150px',
      tabs:{
        loginTab:{
          show:1,
        },
        registerTab:{
          show:0,
        }
      }
    }
  }


  

  toggleTab = (event) => {
    let refrence = event.target.id.replace('Button','');

    let state = { ...this.state.tabs };
    for(let row in state){
      state[row].show = 0;
    }
    state[refrence].show = 1;
    this.setState({ tabs: {
      ...state
    }});

  }

    render() {
      this.loginTab = React.createRef();
      this.registerTab = React.createRef();
      this.passwordTab = React.createRef();  
      return (
        <section className="auth-panel" >
          <header>
            <h1>Lol Auth Panel</h1>
            <p>Login or Register From Here!</p>
          </header>
          <div className="tabs" >
            <div className="row">
              <div {...this.state.tabs.loginTab} className="tab col-lg-6 col-md-6 col-sm-6" id="loginTabButton" ref={this.loginTabButton} onClick={this.toggleTab}>
                Login
              </div>
              <div {...this.state.tabs.registerTab} className="tab col-lg-6 col-md-6 col-sm-6" id="registerTabButton" ref={this.registerTabButton} onClick={this.toggleTab}>
                Register
              </div>
            </div>
          </div>
          <section className="tabs-selectors">
            { this.state.tabs.loginTab.show == 1 ? <div ref={this.loginTab} >
              {/* Here Login */}
              <Login />
            </div> : null }
            { this.state.tabs.registerTab.show == 1 ? <div ref={this.registerTab} >
              {/* Here Register */}
              <Register />
            </div> : null }
          </section>

        </section>
      );
    }
  }
  
  export default connect(mapDispatchToProps)(withRouter(Auth));
  