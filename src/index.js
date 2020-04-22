import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import StorageUtils from './utils/strorageUtils';
import memoryUtils from './utils/memoryUtils';

//内存中读取登录信息
const user = StorageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
