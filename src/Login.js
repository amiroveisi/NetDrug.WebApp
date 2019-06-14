import React , {Component} from 'react';
import {Button, Card, Elevation, InputGroup, Spinner, Classes} from '@blueprintjs/core';
import { ServerResponse } from 'http';
import * as ConstantValues from './Constants';
import signal from 'signal-js';
import { Redirect } from 'react-router-dom';

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            IsLoggedIn : false,
            ReturnUrl : props.extra.returnUrl
        };
        console.log(props);
        this.UsernameChanged = this.UsernameChanged.bind(this);
        this.PasswordChanged = this.PasswordChanged.bind(this);
        this.LoginButtonClicked = this.LoginButtonClicked.bind(this);
        
    }
    render()
    {
        console.log(this.state.ReturnUrl);
        if(this.state.isLoggedIn)
        {
            // if(!this.state.ReturnUrl)
            //    this.setState({
            //        ReturnUrl : '/'
            //    });
          return <Redirect to={this.state.ReturnUrl}/>
        }
        return(
        <div className="container-fluid mt-5 h-100">
            <div className="row justify-content-center h-100 ">
                <div className="col-3 ">
                   
                    <Card interactive={false} elevation={Elevation.TWO} style={{height: 210 + "px"}}>
                    <h3>Login</h3>
                   
                        <div className="bp3-input-group .modifier mt-4">
                            <span className="bp3-icon bp3-icon-user"></span>
                            <input className="bp3-input bp3-round" placeholder="Username" onChange={this.UsernameChanged}/> 
                        </div>
                        <div className="bp3-input-group .modifier mt-2">
                            <span className="bp3-icon bp3-icon-lock"></span>
                            <input type="password" className="bp3-input bp3-round" placeholder="Password" onChange={this.PasswordChanged}/>
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                        <Button intent="primary" text="Login" onClick={this.LoginButtonClicked}
                        loading={this.state.isLoading}></Button>
                        </div>
                        
                    </Card>
                </div>
            </div>
        </div>
        ); 
    }
    LoginButtonClicked(event) {
        this.setState({
            isLoading : true
        });
        let thisObject = this;
        fetch(`${ConstantValues.WebApiBaseUrl}/token`,
        {
            method : "POST",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body : 'Username=' + this.state.username + '&Password=' + this.state.password + '&grant_type=password'

            }).then(function(response){
               let token = '';
                response.json().then(data => {
                    if(response.status == 200)
                    {
                        token = data;
                        sessionStorage.setItem('token',token);
                        thisObject.setState({
                            isLoading  :false,
                            IsLoggedIn : true
                        });
                        signal.emit(ConstantValues.LoggedInEvent, token);
                    }
                    console.log(data);
                });
                
            });
          
        }
    
    UsernameChanged(event)
    {
        this.setState({
            username: event.target.value
        });
    }
    PasswordChanged(event)
    {
        this.setState({
            password: event.target.value
        });
    }
}
export default Login;


