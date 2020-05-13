import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import StorageUtils from "./utils/strorageUtils";
import memoryUtils from "./utils/memoryUtils";
import menuUtils from "./utils/menuUtils";
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from "antd";

moment.locale('zh-cn');
//内存中读取登录信息
const user = StorageUtils.getUser();
const list = StorageUtils.getPower();
memoryUtils.user = user;
menuUtils.menuList = list;

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
