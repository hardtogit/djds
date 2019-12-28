import React from 'react';
import {Router,Redirect,Route,IndexRedirect,IndexRoute,hashHistory} from 'react-router';
import Page from '@/components/Page'
import Home from './pages/home'
import Choice from './pages/choice'
import Fill from './pages/fill'
import Share from './pages/share'
import './App.css';

function App() {
  return (
    <Router history={hashHistory}>
      <Route  path="/" component={Page}>
        <IndexRedirect to="home" />
        <Route path="home" component={Home}/>
        <Route path="choice" component={Choice}/>
        <Route path="fill/:type/:content" component={Fill}/>
        <Route path="share/:id" component={Share}/>
      </Route>
      <Redirect from="/*" to="/" />
    </Router>
  );
}

export default App;
