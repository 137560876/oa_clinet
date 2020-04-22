import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/user/login/login";
import Admin from "./pages/user/admin/admin";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/" component={Login}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
