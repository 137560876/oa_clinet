import React from 'react';
import './change-password.less';
import { Card, Input, Button } from 'antd';

// import memoryUtils from '../../../../utils/memoryUtils';
// import strorageUtils from '../../../../utils/strorageUtils';
// import { reqChangePassowrd } from '../../../../api/link';

export default class ChangePassword extends React.Component {
  state = {
    
    oldPassword: null,
    newPassword: null,
    requestPassword: null,

  };

  change(e, f) {
    switch (f) {
      case 1:
        let tem1 =e.target.value;
        if (tem1.length < 1) {
         tem1 = null; 
        }
        this.setState({
          oldPassword: tem1,
        });
        break;
      case 2:
        let tem2 =e.target.value;
        if (tem2.length < 1) {
         tem2 = null; 
        }
        this.setState({
          newPassword: tem2,
        });
        break;
      case 3:
        let tem3 =e.target.value;
        if (tem3.length < 1) {
         tem3 = null; 
        }
        this.setState({
          requestPassword: tem3,
        });
        break;
      default:
        break;
    }
  }

  //前端判断
  inputCherk(oldp, newp, reqp) {
    if(oldp === null || newp === null || reqp === null) {
      console.log("请填写完所有信息");
      return false;
    }
    else if(oldp === newp) {
      console.log("新老密码不能相同");
      return false;
    }
    else if(newp !== reqp) {
      console.log("两次新密码输入不一致");
      return false;
    } else {
      return true;
    }
  }

  //点击按钮事件
  handleClick() {
    console.log(this.state.oldPassword, this.state.newPassword, this.state.requestPassword);
    //前端判断
    const re = this.inputCherk(this.state.oldPassword, this.state.newPassword, this.state.requestPassword);
    if(re) {
      //后端判断
      console.log("后端判断");
      
    }
  }

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
            <div><Input type="password" onChange={(e) => this.change(e, 1)} placeholder="请输入旧密码" /></div>
          </div>
          <div className="line">
            <div className="label">新密码:</div>
            <div><Input type="password" onChange={(e) => this.change(e, 2)} placeholder="请输入新密码" /></div>
          </div>
          <div className="line">
            <div className="label1">确认密码:</div>
            <div><Input type="password" onChange={(e) => this.change(e, 3)} placeholder="请重新输入一次密码" /></div>
          </div>
          <div className="bt-container">
            <Button 
            type="primary" 
            onClick={() => this.handleClick()}
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