import React, { useState, useRef } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import PrimeReact from 'primereact/api';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import logo from './logo.svg';
import './App.css';
import ChartPrime from './components/chart.prime'
import {  BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import AddMedia from './components/Addmedia';
import FileUploadDemo from './components/fileuploaddemo';
import TreeTableTemplatingDemo from './components/treetabledemo';
import TabMenuDemo from './components/Tabmenu';


function App() {
  const [text, setText] = useState('');
  const toastRef = useRef();

  // active ripple effect
  PrimeReact.ripple = true;

  const onFormSubmit = (e) => {
    if (text) {
      toastRef.current.show({ severity: 'info', summary: text, life: 3000 });
    }

    // clear
    setText('');

    e.preventDefault();
  }

  return (
    <div className="App">

    <Router>
        <div>
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
            <li><Link to={'/addmedia'} className="nav-link">AddMedia</Link></li>
            <li><Link to={'/chart'} className="nav-link">Chart</Link></li>
            <li><Link to={'/fileupload'} className="nav-link">fileupload</Link></li>
            <li><Link to={'/treetabledemo'} className="nav-link">treetable</Link></li>
            <li><Link to={'/tabmenu'} className="nav-link">tabmenu</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/contact' component={Contact} />
              <Route path='/about' component={About} />
              <Route path='/addmedia' component={AddMedia} />
              <Route path='/chart' component={ChartPrime} />
              <Route path='/fileupload' component={FileUploadDemo} />
              <Route path='/tabmenu' component={TabMenuDemo} />
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
