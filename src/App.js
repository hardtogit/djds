import React from 'react';
import {Router,Redirect,Route,IndexRedirect,IndexRoute,hashHistory} from 'react-router';
import Page from '@/components/Page'
import Home from './pages/home'
import Buy from './pages/buy'
import Pay from './pages/pay'
import './App.css';

function App() {
  return (
    <Router history={hashHistory}>
      <Route  path="/" component={Page}>
        <IndexRedirect to="home" />
        <Route path="home" component={Home}/>
        <Route path="buy" component={Buy}/>
        <Route path="pay" component={Pay}/>
      </Route>
      <Redirect from="/*" to="/" />
    </Router>
  );
}

export default App;
