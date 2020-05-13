import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { Layout, Modal } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import menuUtils from '../../utils/menuUtils';
import strorageUtils from '../../utils/strorageUtils';
import './header.less'

const { Header } = Layout;

class HeaderTop extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  /**
   * 退出登录
   */
  logout() {
    Modal.confirm({
      title: '确认要退出登录吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        //删除保存的user
        strorageUtils.removeUser();
        strorageUtils.removePower();
        memoryUtils.user = {};
        menuUtils.menuList = [];
        //跳转到登录
        this.props.history.replace('/login')

      },
      onCancel() {
      },
    });
  }

  UNSAFE_componentWillMount() {
    this.userName = memoryUtils.user.name;
    this.userIcom = memoryUtils.user.icon;
  }


  render() {

    return (
      <div className="head">
        <Header className="clearfix" style={{ background: "#fff" }}>
          <div className="logo" >

          </div>
          <div className="my-info">
            <div className="img-container">
              <Avatar size="large" src={this.userIcom} icon={<UserOutlined />} />
            </div>
            <div className="info-detail">
              <div className="space"></div>
              <div className="line"></div>
              <div className="my-name">
                <span>{this.userName}</span>
              </div>
              <div className="content">
                <Link to="/myhome">
                  个人中心
                </Link>
              </div>
              <div className="content" onClick={this.logout}>退出登录</div>
            </div>
          </div>
        </Header>
      </div>
    );
  }
}

export default withRouter(HeaderTop);