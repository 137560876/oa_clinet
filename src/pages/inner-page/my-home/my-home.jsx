import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons';


import Information from './information/information';
import ChangePassword from './change-password/change-password';
import EditInfromation from './edit-information/edit-information';

export default class MyHome extends React.Component {

  state = {
    current: 'information',
  };

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {

    return (
      <div className="myhome">
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="information">
            <UserOutlined />
              个人页面
          </Menu.Item>
          <Menu.Item key="edit">
            <SettingOutlined />
              修改信息
          </Menu.Item>
          <Menu.Item key="change">
            <LockOutlined />
              修改密码
          </Menu.Item>
        </Menu>
        <Information play={this.state.current} />
        <ChangePassword play={this.state.current} />
        <EditInfromation play={this.state.current} />
      </div>
    );
  }
}