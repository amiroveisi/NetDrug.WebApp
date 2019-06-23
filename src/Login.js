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
            ReturnUrl : '',
            HasErrors : false
        };
        //console.log(props);
        this.UsernameChanged = this.UsernameChanged.bind(this);
        this.PasswordChanged = this.PasswordChanged.bind(this);
        this.LoginButtonClicked = this.LoginButtonClicked.bind(this);
        
    }
    // componentDidMount()
    // {
    //     const { match : {params}} = this.props;
    //     let returnUrl = params.returnUrl;
    //     console.log(params);
    //     this.setState({
    //         ReturnUrl : returnUrl
    //     });
    // }
    render()
    {
        let errorMesasge = "";
        let errorHeight = 0;
        if(this.state.HasErrors)
        {
            errorMesasge = (<span >Login failed. please try again</span>);
            errorHeight = 35;
        }
        if(this.state.IsLoggedIn)
        {
            // if(!this.state.ReturnUrl)
            //    this.setState({
            //        ReturnUrl : '/'
            //    });
          return <Redirect to="/"/>
        }
        return(
        <div className="container-fluid mt-5 h-100">
            <div className="row justify-content-center h-100 ">
                <div className="col-3 ">
                   
                    <Card interactive={false} elevation={Elevation.TWO} style={{height: (210 + {errorHeight}) + "px"}}>
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
                        loading={this.state.IsLoading}></Button>
                        </div>
                        <div>
                            {errorMesasge}
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
              try {
                return response.json();
              } catch (ex) {
                Promise.reject({exception: ex, body: response, type:'unparsable'});
                thisObject.setState({
                    HasErrors : true,
                    isLoading : false
                });                  
              }
            }).then(data => {
                    if(data.access_token)
                    {
                        // console.log(data.access_token);
                        sessionStorage.setItem('token',data.access_token);
                        thisObject.setState({
                            IsLoading  :false,
                            IsLoggedIn : true
                        });
                        signal.emit(ConstantValues.LoggedInEvent, data.access_token);
                    }
                    else
                    {
                        thisObject.setState({
                            HasErrors : true,
                            IsLoading : false
                        });
                    }
                   // console.log(data);
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


