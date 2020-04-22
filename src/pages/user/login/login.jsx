import React from 'react';
import './login.less';
import { Modal, message } from 'antd';
import { reqlogin } from '../../../api/link';
import memoryUtils from '../../../utils/memoryUtils';
import storageUtils from '../../../utils/strorageUtils';
import { Redirect } from 'react-router-dom';
/**
 * @description: 登录的路由组件
 */


export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  //失败弹窗提示（ant-design）
  inputError(title, content) {
    Modal.error({
      title: title,
      content: content,
    });
  }

  //前端判断输入是否正确
  isInputRight() {
    let username = this.username.value;
    let password = this.password.value;
    if (username === null || username.length === 0 || password === null || username.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  //点击登录事件
  async handleClick() {
    let username = this.username.value;
    let password = this.password.value;
    //前台判断是否符合标准
    if (this.isInputRight()) {
      //发送到服务器检测
      const response = await reqlogin(username, password)
      console.log(response)
      //判断登录是否成功
      const result = response;
      if (result.statu === 200) {
        message.success("登录成功");
        //跳转到主页面
        //登录信息存储到内存
        const user = result
        memoryUtils.user = user;
        storageUtils.saveUser(user);
        this.props.history.replace('/admin');
      } else {
        message.error("登录失败，用户名或密码不正确");
      }

    } else {
      this.inputError("登陆失败", "请填写用户名或密码");
    } 
  }

  render() {
    //用户已登录自动跳转到管理
    const user = memoryUtils.user;
    if (user && user.id) {
      return <Redirect to='/admin' />
    }

    return (
      <div className="login">
        <div className="frame">
          <div className="left">
            <div className="title">
              <span>登录</span>
            </div>
            <div className="input-container">
              <input type="text" ref={el => this.username = el} placeholder="用户名" />
              <input type="password" ref={el => this.password = el} name="password" placeholder="密码" />
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
              <div className="action-container" onClick={this.handleClick}>
                <span>登录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}