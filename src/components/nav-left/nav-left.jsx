import React from 'react'
import {
  UserOutlined, ContainerOutlined, TabletOutlined, SwitcherOutlined, UserDeleteOutlined,
  ForkOutlined, HomeOutlined, LaptopOutlined, NotificationOutlined, UserAddOutlined,
  BulbOutlined, DeploymentUnitOutlined, ApartmentOutlined, BellOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { reqGetPermission } from '../../api/link';
import memoryUtils from '../../utils/memoryUtils';
import menuUtils from '../../utils/menuUtils';
import strorageUtils from '../../utils/strorageUtils';


const { SubMenu } = Menu;
const { Sider } = Layout;
const iconList = [
  <UserOutlined />,
  <LaptopOutlined />,
  <NotificationOutlined />,
  <HomeOutlined />,
  <ContainerOutlined />,
  <ForkOutlined />,
  <TabletOutlined />,
  <SwitcherOutlined />,
  <BulbOutlined />,
  <DeploymentUnitOutlined />,
  <ApartmentOutlined />,
  <BellOutlined />,
  <UserAddOutlined />,
  <UserDeleteOutlined />,
]


class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuNodes: [],
    };

  }


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

  //处理列表
  formatList(list, obj) {

    for (let i in list) {

      if (list[i].parentId === obj.id) {

        let newObj = {
          title: list[i].name,
          key: list[i].key,
          icon: list[i].icon,
          parentId: list[i].parentId,
        }
        if (obj.children === undefined) {
          obj.children = [];
          obj.children.push(newObj);
        } else {
          obj.children.push(newObj);
        }
        //this.formatList(list, newObj);
      }
    }
  }

  //根据用户id获取权限
  async getPermission(userId) {

    const response = await reqGetPermission(userId);
    const powerList = response.datas;
    const formatList = []
    for (let i in powerList) {
      if (powerList[i].parentId === 0) {
        let newObj = {
          id: powerList[i].id,
          title: powerList[i].name,
          key: powerList[i].key,
          icon: powerList[i].icon,
          parentId: powerList[i].parentId,
        }
        this.formatList(powerList, newObj);
        formatList.push(newObj);
      }
    }
    return formatList;
  }

  UNSAFE_componentWillMount() {
    const userId = memoryUtils.user.id;

    if (!menuUtils.menuList || menuUtils.menuList.length === 0) {
      console.log("请求权限");
      
      this.getPermission(userId).then((formatList) => {
        strorageUtils.savePower(formatList);
        console.log(formatList);
        const menuNodes = this.getMenuNodes(formatList);
        this.setState({
          menuNodes: menuNodes,
        })
      });
    } else {
      console.log("读取历史的权限");
      const menuNodes = this.getMenuNodes(menuUtils.menuList);
      this.setState({
        menuNodes: menuNodes,
      })
      
    }
  }

  render() {

    const path = this.props.location.pathname;
    const openKey = this.openKey;

    return (
      <Sider width={200} className="site-layout-background" style={{ paddingTop: "28px" }}>
        <Menu
          mode="inline"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            this.state.menuNodes
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