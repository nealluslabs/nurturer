import ReactDOM from 'react-dom';
import 'typeface-poppins';
import './i18n';
import './react-chartjs-2-defaults';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';
import App from 'app/App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);


//COME ANd comment out this console method IF YOU WANT YOUR CONSOLE.LOGS TO SHOW AGAIN
//if(!window.console) window.console = {};
//var methods = ["log", "debug", "warn", "info"];
//for(var i=0;i<methods.length;i++){
//    console[methods[i]] = function(){};
//}


ReactDOM.render(
    // <PersistGate loading={null} persistor={persistor}>
    <App />
    // </PersistGate>
, document.getElementById('root'));

reportWebVitals();


serviceWorker.unregister();
