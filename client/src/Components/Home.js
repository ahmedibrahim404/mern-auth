import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../reduxState';
import { checkAuth } from '../api';
import { withRouter } from 'react-router'

class Home extends Component {
  
  constructor(){
    super();
    checkAuth().then(( data ) => data.json() ).then(( data ) => {
      if(data.success === false){
        localStorage.removeItem('authToken');
        this.props.history.push('/auth')
      } else {
        this.props.onUserLogin(data.username);
      }
    })
  }

    render() {
      return (
          <div>
            <h1>Hello @{this.props.username}</h1>
          </div>
        );
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
  