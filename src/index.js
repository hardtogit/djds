import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import toast from "@/utils/toast";
window.apiconn.response_received_handler = function(jo){
  // if(!sessionStorage.getItem('credential_data')){
  //   if(window.location.href.indexOf('login')===-1){
  //     history.push('/login');
  //   }
  // };
  if (jo.ustr) {
    // toast.error({title:'错误提示',content:jo.ustr});
    if(window.callBackFn[jo.obj + '_' + jo.act]&&window.callBackFn[jo.obj + '_' + jo.act].length){
      window.callBackFn[jo.obj + '_' + jo.act].shift()(jo);
    }
  } else {
    if (window.callBackFn[jo.obj + '_' + jo.act] && window.callBackFn[jo.obj + '_' + jo.act].length) {
      window.callBackFn[jo.obj + '_' + jo.act].shift()(jo);
    }
  }
  // if(!jo.ustr&&jo.obj === 'person'&&jo.act === 'login'){
  //   console.log('a');
  // }
  // if(jo.ustr&&jo.obj === 'person'&&jo.act === 'login') {
  //   if (window.location.href.indexOf('login') === -1) {
  //     sessionStorage.removeItem('credential_data');
  //     window.apiconn.logout();
  //     history.push('/login');
  //   }
  // }
};
window.apiconn.wsUri = 'ws://101.132.136.124:51718/djds';
window.apiconn.connect();
window.apiconn.state_changed_handler = function() {
  if (window.apiconn.conn_state == 'IN_SESSION') {
    sessionStorage.setItem('credential_data', JSON.stringify(window.apiconn.credential_data));
  } else if (window.apiconn.conn_state == 'LOGIN_SCREEN_ENABLED') {
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
