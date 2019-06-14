import React, {Component} from 'react';
import {Navbar, Alignment, Button} from '@blueprintjs/core';
import AuthenticationService from './AuthenticationService';

class TopMenu extends Component
{
    constructor(props)
    {
        super(props);
        this.OnHomeMenuClicked = this.OnHomeMenuClicked.bind(this);
        this.OnLogInLogoutCicked = this.OnLogInLogoutCicked.bind(this);
        this.OnDrugMenuCicked = this.OnDrugMenuCicked.bind(this);
    }
    render(){
        let loggedInStatus = 'Log In';
        if(AuthenticationService.IsLoggedIn())
          {
            loggedInStatus = 'Logout';
          }
        return (
        <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading><h5>Net Drug Data Manager</h5></Navbar.Heading>
          <Button className="bp3-minimal" icon="home" text="Home" onClick={this.OnHomeMenuClicked}/>
          <Button className="bp3-minimal" icon="database" text="Drugs" onClick={this.OnDrugMenuCicked}/>
          <Button className="bp3-minimal" icon="user" text={loggedInStatus} onClick={this.OnLogInLogoutCicked}/>
        </Navbar.Group>
      </Navbar>);
    }
    OnLogInLogoutCicked()
    {
        if(AuthenticationService.IsLoggedIn())
        {
            AuthenticationService.Logout('/');
        }
        else{
            AuthenticationService.LogIn();
        }
    }
    OnDrugMenuCicked(event)
    {
      console.log("drug menu clicked");
      window.location.href = "/drugs/list";
    }
    OnHomeMenuClicked(event)
    {
      window.location.href = "/";
    }
}
 export default TopMenu;