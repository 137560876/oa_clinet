import React from 'react';
import './power.less';
import { Tree, Button } from 'antd';
import menuList from '../../../config/menuConfig';
import { reqChangePower, reqGetPermission, reqGetDepartmentList, reqGetUserListByDepartmentId } from '../../../api/link';
import {
  HomeOutlined,
  DownOutlined,
  ApartmentOutlined,
  UserOutlined,
  SwapOutlined,
} from '@ant-design/icons';



export default class Power extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowUserPowers: [],
      checkedKeys: [],
      willKeys: [],
      tree: [],
      nowUser: undefined,
    };

  }

  //处理列表
  formatList(list, obj) {

    for (let i in list) {

      if (list[i].parentId === obj.key) {

        let newObj = {
          title: list[i].name,
          key: list[i].id,
          isPerson: false,
          icon: <ApartmentOutlined />,
          parentId: list[i].parentId,
          children: [],
        }
        if (obj.children === undefined) {
          obj.children = [];
          obj.children.push(newObj);
        } else {
          obj.children.push(newObj);
        }
        this.formatList(list, newObj);
      }
    }
  }

  //获得列表
  async getDepartmentList() {
    const response = await reqGetDepartmentList();

    var formatList = []
    //添加code判断
    var departmentList = response.datas;

    this.setState({
      plist: departmentList,
    })
    for (let i in departmentList) {
      //第一级
      if (departmentList[i].parentId === 0) {
        let obj = {
          title: departmentList[i].name,
          key: departmentList[i].id,
          isPerson: false,
          icon: <HomeOutlined />,
          parentId: departmentList[i].parentId,
        }
        formatList.push(obj);
        this.formatList(departmentList, obj);
      }
    }
    this.setState({
      tree: formatList,
    })

  }

  onLoadData = (treeNode) => {

    return new Promise(resolve => {

      reqGetUserListByDepartmentId(treeNode.key).then(
        resposne => {

          const addlist = resposne.datas;
          for (let k in addlist) {

            let obj = {
              id: addlist[k].id,
              title: addlist[k].name,
              key: addlist[k].id + 10000,
              username: addlist[k].username,
              isPerson: true,
              isLeaf: true,
              icon: <UserOutlined />,
              parentId: treeNode.key,
            }

            if (treeNode.children) {
              treeNode.children.push(obj);
            } else {
              treeNode.children = [];
              treeNode.children.push(obj);
              console.log(treeNode);

            }

          }
          this.setState({
            tree: [...this.state.tree],
          });
          resolve();
        }
      )


    });

  }

  onCheck = (checkedKeys, info) => {
    var powerList = [];
    var willList = [];
    info.checkedNodes.forEach(item => {
      powerList.push(item.key);
      willList.push(item.key);
      if(item.parentId !== 0 && willList.indexOf(item.parentId) === -1) {
        willList.push(item.parentId);
      }
    });
    this.setState({
      willKeys: willList,
    })
    
    this.setcheckedKeys(powerList);
  }

  //获取用户权限的方法
  async getPowerList(id) {

    const response = await reqGetPermission(id);
    const rlist = response.datas;

    let powerList = [];
    for (let i in rlist) {
      powerList.push(rlist[i].id);
    }

    this.setState({
      nowUserPowers: powerList,
      checkedKeys: powerList,
    })
  }

  //动态更新选中的节点
  setcheckedKeys(checkedKey) {
    this.setState({
      checkedKeys: checkedKey,
    })
  }

  //向后台发起更新权限请求
  async changeUserPower(id, list) {
    const response = await reqChangePower(id, list);
    console.log(response);
    
  }

  //点击事件
  onSelect = (selectedKeys, info) => {

    if (info.node.isPerson) {

      //后端发起请求获取拥有的权限
      this.getPowerList(info.node.id);
      this.setState({
        nowUser: info.node.id,
      })
    } else {
      console.log("选中了:" + info.node.title);

    }
  }


  //重置返回用户原本的权限
  reSetPower = () => {
    this.setcheckedKeys(this.state.nowUserPowers);
  }

  //按下修改按钮后向服务器发起修改
  changePower = () => {
    if (this.state.nowUser !== undefined) {
      console.log(this.state.nowUser, this.state.checkedKeys);
      
      this.changeUserPower(this.state.nowUser, this.state.checkedKeys);
    }
  }

  componentDidMount() {
    this.getDepartmentList();
  }

  render() {

    return (
      <div className="power">
        <div className="person-list">
          <Tree
            showIcon
            onSelect={this.onSelect}
            loadData={this.onLoadData}
            height={540}
            switcherIcon={<DownOutlined />}
            treeData={this.state.tree}
          />
        </div>
        <div className="icon-container">
          <SwapOutlined style={{ fontSize: "64px" }} />
        </div>
        <div className="power-list">
          <Tree
            checkable
            onCheck={this.onCheck}
            height={540}
            checkedKeys={this.state.checkedKeys}
            defaultExpandAll
            treeData={menuList}
          />
        </div>
        <div className="bt-container">
          <Button
            type="primary"
            onClick={this.reSetPower}
            style={{ marginLeft: 15, marginRight: 15, marginTop: 6, height: 40, width: 120 }}>
            重置
        </Button>
          <Button
            type="primary"
            onClick={this.changePower}
            style={{ marginLeft: 15, marginRight: 15, marginTop: 6, height: 40, width: 120 }}>
            修改
        </Button>
        </div>
      </div>
    );
  }
}