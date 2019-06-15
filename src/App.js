import React, { Component } from 'react';
import {Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import '../node_modules/@blueprintjs/table/lib/css/table.css'
import './App.css';
import TopMenu from './TopMenu';
import MedicalProductsGrid from './MedicalProductsGrid';
import NewMedicalProduct from './NewMedicalProduct';
import EditMedicalProduct from './EditMedicalProduct';
import MedicalProductDetails from './MedicalProductDetails';

class App extends Component {
//   cellRenderer(rowIndex){
//     return (<Cell>{(rowIndex * 10).toFixed(2)}</Cell>);
// };
constructor(props){
  super(props);
  // signal.on(constantValues.LoggedInEvent,(token)=>{
 
    
  // });
}
  render() {
   let loginProps = {
     returnUrl : '/'
   };
    return (
      <html>
        <head>
          <link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
          <link href="https://unpkg.com/@blueprintjs/core@^3.0.0/lib/css/blueprint.css" rel="stylesheet" />
          <link href="https://unpkg.com/@blueprintjs/icons@^3.0.0/lib/css/blueprint-icons.css" 
          rel="stylesheet" />
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
     
       </head>
        
    <body>
      <TopMenu/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' render={props => <Login {...props} extra={loginProps}/> }/>
        <Route path='/medicalproducts/list' component={MedicalProductsGrid}/>
        <Route path='/medicalproducts/new' component={NewMedicalProduct}/>
        <Route path='/medicalproducts/edit/:drugId' component={EditMedicalProduct}/>
        <Route path='/medicalproducts/details/:drugId' component={MedicalProductDetails}/>
      </Switch>
    </body>
  

 </html>
     
    );
  }
 
}


export default App;
