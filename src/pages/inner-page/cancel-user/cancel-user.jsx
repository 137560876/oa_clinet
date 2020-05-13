import React from 'react';
import './cancel-user.less';
import { withRouter } from 'react-router-dom';
import { Tree, Descriptions, Card, Button, Divider, Modal } from 'antd';
import { formatStatus } from '../../../utils/statusUtils';
import { reqdeleteUser, reqFindUser, reqGetDepartmentList, reqGetUserListByDepartmentId } from '../../../api/link';
import {
  HomeOutlined,
  DownOutlined,
  ApartmentOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';


class CancelUser extends React.Component {
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

      deleteUsername: '',
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

  //删除用户
  async deleteUser(username) {
    const response = await reqdeleteUser(username);
    console.log(response);
    
  }  

  //点击注销按钮
  handelCancel = () => {
    Modal.confirm({
      title: '确认要注销该员工账户吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        //删除
        console.log(this.state.deleteUsername);
        
        this.deleteUser(this.state.deleteUsername);
        this.props.history.replace('/new-user');
        
      },
      onCancel() {
      },
    });
  }

  //鼠标点击节点事件
  onSelect = (selectedKeys, info) => {

    if (info.node.isPerson) {
      this.setState({
        deleteUsername: info.node.username,
      })
      
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

  //异步加载数据
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
      <div className="cancel-user">
        <div className="person-container">
          <Tree
            showIcon
            onSelect={this.onSelect}
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
          <Divider />
          <Card style={{marginTop: '40px', width: '150px' }}>
            <div>操作</div>
            <Divider />
            <Button type="primary" block onClick={this.handelCancel}>注销</Button>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(CancelUser);