import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../reduxState';
import Input from '../../UI/Input';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../api';

import '../../styles/Login.css'

class Login extends Component {

  constructor(){
      super();
      this.state={
          error:{
              isError:false,
              message:""
          },
          user:{
              username:null,
              password:null,
          },
          showTokenVerification:false,
      }
      this.loginAccount = this.loginAccount.bind(this);
  }

  changed(e){
    let user = { ...this.state.user }
    user[e.target.getAttribute('inputtype')] = e.target.value;
    this.setState({
        user
    })
  }

  loginAccount(){

    const { username, password } = this.state.user;
    loginUser(username, password).then( ( data ) => data.json() ).then( ( user ) => {
        if(user.success === true){
            this.props.onUserLogin(user.username);
            localStorage.setItem('authToken', user.token);
            this.props.history.push('/')
        } else {
            this.setState({
                error:{
                    isError:true,
                    message:user.message
                }
            })
        }
    }).catch((err) => new Error(err));
    
  }
  
  
  render() {
      
      return (
      <section className="login">
          <div className="container">
              { this.state.error.isError ? <div className="alert alert-danger" style={{textAlign:"left", marginTop:"10px"}}>{this.state.error.message}</div> : null }
              { this.props.location.search.indexOf('error=true') > -1 ? <div className="alert alert-danger" style={{textAlign:"left", marginTop:"10px"}}>Error..</div> : null }              
              <p>Please Put Your Information Below!</p>
              <Input username={1} reference="user" onChange={(e) => this.changed(e)} />
              <Input password={1} reference="password" onChange={(e) => this.changed(e)} />
              <button onClick={this.loginAccount} id="loginBtn">Login Here!</button>
          </div>
      </section>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
