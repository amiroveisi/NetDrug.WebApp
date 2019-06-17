import React, {Component} from 'react';
import {Navbar, Alignment, Button} from '@blueprintjs/core';
import AuthenticationService from './AuthenticationService';
import {Redirect, Link} from 'react-router-dom';

class TopMenu extends Component
{
    constructor(props)
    {
        super(props);
       // this.OnHomeMenuClicked = this.OnHomeMenuClicked.bind(this);
        this.OnLogInLogoutCicked = this.OnLogInLogoutCicked.bind(this);
        // this.OnDrugMenuCicked = this.OnDrugMenuCicked.bind(this);
        // this.OnMedicalProductMenuCicked = this.OnMedicalProductMenuCicked.bind(this);
        // this.state={
        //   MedicalProductMenuClicked : false
        // };
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
          <Button className="bp3-minimal" icon="home">
            <Link to="/">Home</Link>
          </Button>
          <Button className="bp3-minimal" icon="database">
            <Link to="/drug/list">Drugs</Link>
          </Button>
          <Button className="bp3-minimal" icon="database">
            <Link to="/medicalproduct/list">Medical Products</Link>
          </Button>
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
    // OnDrugMenuCicked(event)
    // {
    //   console.log("drug menu clicked");
    //   window.location.href = "/drug/list";
    // }
    // OnHomeMenuClicked(event)
    // {
    //   window.location.href = "/";
    // }
    // OnMedicalProductMenuCicked(event)
    // {
    //     this.setState({
    //       MedicalProductMenuClicked:true
    //     });
    // }
}
 export default TopMenu;