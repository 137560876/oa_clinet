import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

//引入组件
import Login from "./pages/user/login/login";
import Admin from "./pages/user/admin/admin";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/login" component={Login}></Route>
        <Route path="/admin" component={Admin}></Route>
      </BrowserRouter>
    );
  }
}
