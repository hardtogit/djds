import React from 'react';
import {Router,Redirect,Route,IndexRedirect,IndexRoute,hashHistory} from 'react-router';
import Page from '@/components/page'
import Home from './pages/home'
import './App.css';

function App() {
  return (
    <Router history={hashHistory}>
      <Route  path="/" component={Page}>
        <IndexRedirect to="home" />
        <Route path="home" component={Home}>

        </Route>
      </Route>
      <Redirect from="/*" to="/" />
    </Router>
  );
}

export default App;
