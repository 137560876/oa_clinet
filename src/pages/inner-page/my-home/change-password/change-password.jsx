import React from 'react';
import './change-password.less';
import { Card, Input, Button } from 'antd';

export default class ChangePassword extends React.Component {

  render() {

    return (
      <div
        className="change-password"
        style={{ display: this.props.play === 'change' ? 'block' : 'none' }}
      >
        <Card
          style={{
            marginLeft: '20px',
            marginTop: '20px',
            width: '400px',
          }}
        >
          <div className="line">
            <div className="label">旧密码:</div>
            <div><Input placeholder="请输入旧密码" /></div>
          </div>
          <div className="line">
            <div className="label">新密码:</div>
            <div><Input placeholder="请输入新密码" /></div>
          </div>
          <div className="line">
            <div className="label1">确认密码:</div>
            <div><Input placeholder="请重新输入一次密码" /></div>
          </div>
          <div className="bt-container">
            <Button 
            type="primary" 
            style={{ margin: '0 10px', marginLeft: '85px' }}
          >
              提交
          </Button>
          </div>
        </Card>
      </div>
    );
  }
}