import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/user/login/login";
import User from "./pages/user/user/user";
import NoticeDetail from "./pages/user/notice-detail/notice-detail";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/noticedetail/:id" component={NoticeDetail}></Route>
          <Route path="/" component={User}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
