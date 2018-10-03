import React , { Component } from 'react';


class Input extends Component {
    


    render() {

        let input;
        this[this.props.reference] = React.createRef();
        if(this.props.username === 1){
            input=(
            <div className="input-group mb-3" style={{...this.props.parentstyle}}>
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <input {...this.props} inputtype="username" ref={this[this.props.reference]} type="text" className={"form-control " + this.props.className} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            );
        } else if (this.props.password === 1) {
            input=(
                <div className="input-group mb-3" style={{...this.props.parentstyle}}>
                <input {...this.props} inputtype="password" ref={this[this.props.reference]} type="password" className={"form-control " + this.props.className} placeholder="Password" />
                </div>
            );    
        } else if (this.props.email === 1){
            input=(
                <div className="input-group mb-3" style={{...this.props.parentstyle}}>
                    <input {...this.props} inputtype="email" ref={this[this.props.reference]} type="email" className={"form-control " + this.props.className} placeholder="Email" aria-label="Email" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">@example.com</span>
                    </div>
                </div>
            )
        }
        
        return input;
    }
  }
  
  
export default Input;
