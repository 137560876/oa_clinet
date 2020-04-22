import React from 'react'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;
const { Sider } = Layout;
const iconList = [
  <UserOutlined />,
  <LaptopOutlined />,
  <NotificationOutlined />
]


class NavLeft extends React.Component {

  /**
   * 根据menuList的数组生成菜单
   */
  getMenuNodes = (menuList) => {

    const path = this.props.location.pathname;

    return menuList.map(item => {
      let iconNum = item.icon;
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <span>
                {iconList[iconNum]}
                {item.title}
              </span>
            </Link>
          </Menu.Item>
        );
      } else {

        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key;
        }

        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                {iconList[iconNum]}
                {item.title}
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    })
  }

  UNSAFE_componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {

    const path = this.props.location.pathname;
    const openKey = this.openKey;

    return (
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            this.menuNodes
          }

        </Menu>
      </Sider>
    );
  }
}

/**
 * 用withRouter包装让NavLeft获得history等3个属性
 */
export default withRouter(NavLeft);