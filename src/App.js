import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import '../node_modules/@blueprintjs/table/lib/css/table.css'
import './App.css';
import * as ConstantValues from './Constants';
import TopMenu from './TopMenu';
import DrugsGrid from './Drug/DrugsGrid';
import NewDrug from './Drug/NewDrug';
import EditDrug from './Drug/EditDrug';
import DrugDetails from './Drug/DrugDetails';
import MedicalProductsGrid from './MedicalProduct/MedicalProductsGrid';
import NewMedicalProduct from './MedicalProduct/NewMedicalProduct';
import MedicalProductEdit from './MedicalProduct/MedicalProductEdit';
import dotnetify from 'dotnetify';
import signalr from 'dotnetify/dist/signalR-netfx';
import './Content/Css/netdrug.css';


class App extends Component {
constructor(props)
{
  super(props);
  dotnetify.hubLib = signalr;
  dotnetify.hubServerUrl = `${ConstantValues.WebApiBaseUrl}/signalr`;
}
  render() {
    //  let loginProps = {
    //    returnUrl : '/'
    //  };
    return (
      <html>
        <head>
          <link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
          <link href="https://unpkg.com/bootstrap@4.0.0/dist/css/bootstrap.min.css" rel="stylesheet" />
          {/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/> */}
          <link href="https://unpkg.com/@blueprintjs/core@^3.0.0/lib/css/blueprint.css" rel="stylesheet" />
          <link href="https://unpkg.com/@blueprintjs/icons@^3.0.0/lib/css/blueprint-icons.css"
            rel="stylesheet" />
          

          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
          <script src="https://unpkg.com/popper.js@1.12.9/dist/popper.min.js" ></script>
          <script src="https://unpkg.com/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>
          <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/signalr@2/jquery.signalR.min.js"></script>
          <script src="https://unpkg.com/dotnetify@3/dist/dotnetify-react.min.js"></script>

          {/* <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script> */}

        </head>

        <body>
          <TopMenu />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login/'  component={Login} />
            <Route path='/drug/list' component={DrugsGrid} />
            <Route path='/drug/new' component={NewDrug} />
            <Route path='/drug/edit/:drugId' render={props => <EditDrug   {...props} CurrentPage={2} />}/>
            <Route path='/drug/details/:drugId' component={DrugDetails} />
            <Route path='/medicalproduct/new' component={NewMedicalProduct} />
            <Route path='/medicalproduct/list' component={MedicalProductsGrid} />
            <Route path='/medicalproduct/edit/:productId' component={MedicalProductEdit} />
          </Switch>
        </body>


      </html>

    );
  }

}


export default App;
