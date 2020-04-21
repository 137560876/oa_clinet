import React from 'react';
import './login.less';
/**
 * @description: 登录的路由组件
 */


export default class Login extends React.Component {

  render() {
    return (
      <div className="login">
        <div className="frame">
          <div className="left">
            <div className="title">
              <span>登录</span>
            </div>
            <div className="input-container">
              <input type="text" placeholder="用户名" />
              <input type="password" name="password" placeholder="密码" />
            </div>
            <div className="message-container">
              <span>忘记密码</span>
            </div>
          </div>
          <div className="right">
            <div className="right-container">
              <div className="right-title">
                <span>操作</span>
              </div>
              <div className="action-container">
                <span>登录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}