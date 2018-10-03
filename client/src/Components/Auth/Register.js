import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../reduxState';
import Input from '../../UI/Input';
import { withRouter } from 'react-router-dom';
import { registerAccount } from '../../api';

import '../../styles/register.css'

class Register extends Component {

    constructor(){
        super();
        this.state={
            isMessage:{
                type:false,
                message:undefined,
            },
            user:{
                username:null,
                password:null,
                email:null
            }
        }

        this.addAccount = this.addAccount.bind(this);
    }

    changed(e){
        let user = { ...this.state.user }
        user[e.target.getAttribute('inputtype')] = e.target.value;
        this.setState({
            user
        })
    }

    addAccount(){
        const { username, email, password } = this.state.user;
        var type;
        registerAccount(username, email, password).then( ( data ) => data.json() ).then( ( user ) => {
            if(user.success == true){
                type = 'success';
            } else {
                type = 'danger';
            }
            
            this.setState({
                isMessage:{
                    type,
                    message:user.message
                }
            })
        }).catch((err) => new Error(err));
    }

    
    
    render() {
        return (
        <section className="register">
            <div className="container">
                <p>Please Put Your Information Below!</p>
                { this.state.isMessage.type == 'success' ? <div className="alert alert-success" style={{textAlign:"left"}}>{ this.state.isMessage.message } </div> : null }                
                { this.state.isMessage.type == 'danger' ? <div className="alert alert-danger" style={{textAlign:"left"}}>{ this.state.isMessage.message } </div> : null }
                <Input username={1} reference="user" onChange={(e) => this.changed(e)} />
                <Input password={1} reference="password" onChange={(e) => this.changed(e)} />
                <Input email={1} reference="email" onChange={(e) => this.changed(e)} />
                <button onClick={this.addAccount} id="registerBtn">Register Here!</button>
            </div>
        </section>
        );
    }
}

export default connect(mapDispatchToProps)(withRouter(Register));
