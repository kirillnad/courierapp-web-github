import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const startApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  serviceWorker.unregister();
};

window.cordova
  ? document.addEventListener('deviceready', startApp, false)
  : startApp();


function checkRestartInAppBrowser(){
      if (window.cordova.InAppBrowser === undefined) {
      console.log('trying failsafe restart of inappbrowser');
          document.addEventListener('deviceready', startApp, false); //this should point to your InAppBrowser startup script.
      }
 }


if (window.cordova) {
  // adjust the 1000 msec to your liking.
  setInterval(checkRestartInAppBrowser, 1000);
}
