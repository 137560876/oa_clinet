import React from 'react';
import './person.less';
import { Tree, Descriptions } from 'antd';
import { formatStatus } from '../../../utils/statusUtils';
import { reqFindUser, reqGetDepartmentList, reqGetUserListByDepartmentId } from '../../../api/link';
import {
  HomeOutlined,
  DownOutlined,
  ApartmentOutlined,
  UserOutlined,
} from '@ant-design/icons';


export default class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plist: [],
      name: '',
      part: '',
      tel: '',
      mail: '',
      addr: '',
      status: '',
      command: '',
      tree: [],
    };

  }

  //获取个人信息
  async getPerson(username) {
    const response = await reqFindUser(username);

    this.setState({
      name: response.data.name,
      tel: response.data.phone,
      mail: response.data.email,
      addr: response.data.address,
      status: formatStatus(response.data.status),
      command: response.data.message,
    })

  }

  onSelect = (selectedKeys, info) => {
    
    if (info.node.isPerson) {
      this.getPerson(info.node.username);
      var part = this.state.plist.find(function (e) { return e.id === info.node.parentId })
      if (part) {
        this.setState({
          part: part.name,
        })
      }
    } else {
      console.log("选中了", info.node.title);
    }
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
    console.log(response);
    
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


  //在节点插入数据
  addData(list, addlist, key) {
    console.log("更新数据");

    for (let i in list) {
      if (list[i].key === key) {
        if (list[i].addData) {
          console.log("加过数据了");

          return;
        } else {
          for (let k in addlist) {
            let obj = {
              title: addlist[k].name,
              key: addlist[k].id + 100,
              isPerson: true,
              icon: <UserOutlined />,
              parentId: list[i].key,
            }
            if (list[i].children) {
              list[i].children.push(obj);
            } else {
              list[i].children = [];
              list[i].children.push(obj);
            }

          }
          list[i].addData = true;
        }

        return;
      } else {
        if (list[i].children) {
          console.log(list[i].key);
          this.addData(list[i].children, addlist, key);
        }
      }

    }
  }

  onLoadData = (treeNode) => {
    
    return new Promise(resolve => {

      reqGetUserListByDepartmentId(treeNode.key).then(
        resposne => {
          
          const addlist = resposne.datas;
          for (let k in addlist) {
            
            let obj = {
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


  //展开节点时调用 (暂时弃用)
  onExpand = async (expandedKeys, info) => {
    if (info.expanded === true) {
      const response = await reqGetUserListByDepartmentId(info.node.key);
      var addlist = response.datas;
      var tree = this.state.tree;
      setTimeout(() => {
        console.log(this.state.tree);

        this.addData(tree, addlist, info.node.key);
      }, 1000);

    }
  };

  componentDidMount() {
    this.getDepartmentList();
    this.setState({
      name: '青渊渊',
      part: '',
      tel: '15988812345',
      mail: '137000@qq.com',
      addr: '总公司7楼 28-5',
      status: '空闲',
      command: '无留言',
    })
  }

  render() {

    return (
      <div className="person">
        <div className="person-container">
          <Tree
            showIcon
            onSelect={this.onSelect}
            //onExpand={this.onExpand}
            loadData={this.onLoadData}
            height={540}
            switcherIcon={<DownOutlined />}
            treeData={this.state.tree}
          />
        </div>
        <div className="space-80"></div>
        <div className="right-container">
          <div className="person-main">
            <Descriptions
              title="个人信息"
              column={{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="姓名">{this.state.name}</Descriptions.Item>
              <Descriptions.Item label="所处部门">{this.state.part}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{this.state.tel}</Descriptions.Item>
              <Descriptions.Item label="电子邮箱">{this.state.mail}</Descriptions.Item>
              <Descriptions.Item label="工作位置">{this.state.addr}</Descriptions.Item>
              <Descriptions.Item label="用户情况">{this.state.status}</Descriptions.Item>
            </Descriptions>
          </div>
          <div className="person-word">
            <Descriptions title="用户留言">
              <Descriptions.Item>
                {this.state.command}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
    );
  }
}