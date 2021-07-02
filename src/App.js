import React, { useState, useRef } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
import PrimeReact from 'primereact/api';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom'
import IpfsManage from './components/Ipfsmanage';
import { AppTopbar } from './AppTopbar';


function App() {

  return (
    <div >
    <Router>
        <div>
          <h2>IPFS management app </h2>
   <AppTopbar  />
          <hr />
          <Switch>
              <Route exact path='/' component={IpfsManage} />
              <Route exact path='/ipfsmanage' component={IpfsManage} />
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
