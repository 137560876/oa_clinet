import React from 'react'
import { Layout } from 'antd';

const { Header } = Layout;

export default class HeaderTop extends React.Component {

  render() {

    return (
      <Header className="header">
        <div className="logo" />
      </Header>
    );
  }
}