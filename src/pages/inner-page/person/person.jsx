import React from 'react';
import './person.less';
import { Tree, Descriptions } from 'antd';
import { reqGetDepartmentList, reqGetUserListByDepartmentId } from '../../../api/link';
import {
  DownOutlined,
  SmileOutlined,
  MehOutlined,
} from '@ant-design/icons';


// const treeData = [

//   {
//     title: '公司总部',
//     key: '0',
//     isPerson: false,
//     icon: <SmileOutlined />,
//     children: [
//       {
//         title: '研发组',
//         key: '0-0',
//         isPerson: false,
//         icon: <MehOutlined />,
//         children: [
//           {
//             title: '开发人员1',
//             key: '0-0-0',
//             name: '开发人员1',
//             part: '总公司',
//             tel: '1234567',
//             mail: '1237@qq.com',
//             addr: '7楼 28-1',
//             status: '空闲',
//             command: '开发人员1的留言',
//             isPerson: true,
//             icon: <MehOutlined />,
//           },
//           {
//             title: '开发人员2',
//             key: '0-0-1',
//             name: '开发人员2',
//             part: '总公司',
//             tel: '12345678',
//             mail: '1237@qq.com',
//             addr: '7楼 28-2',
//             status: '繁忙',
//             command: '开发人员2的留言',
//             isPerson: true,
//             icon: <MehOutlined />,
//           },
//           {
//             title: '开发人员3',
//             key: '0-0-2',
//             name: '开发人员3',
//             part: '总公司',
//             tel: '1234567',
//             mail: '1237@qq.com',
//             addr: '7楼 28-3',
//             status: '空闲',
//             command: '开发人员3的留言',
//             isPerson: true,
//             icon: <MehOutlined />,
//           },
//         ]
//       },
//       {
//         title: '产品组',
//         key: '0-1',
//         isPerson: false,
//         icon: <MehOutlined />,
//       },
//       {
//         title: '测试组',
//         key: '0-2',
//         isPerson: false,
//         icon: <MehOutlined />,
//       },
//       {
//         title: '测开组',
//         key: '0-3',
//         isPerson: false,
//         icon: <MehOutlined />,
//       }
//     ]
//   }
// ];

export default class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  onSelect = (selectedKeys, info) => {
    if (info.node.isPerson) {
      this.setState({
        name: info.node.name,
        part: info.node.part,
        tel: info.node.tel,
        mail: info.node.mail,
        addr: info.node.addr,
        status: info.node.status,
        command: info.node.command,
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
          icon: <SmileOutlined />,
          parentId: list[i].parentId,
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

    for (let i in departmentList) {
      //第一级
      if (departmentList[i].parentId === 0) {
        let obj = {
          title: departmentList[i].name,
          key: departmentList[i].id,
          isPerson: false,
          icon: <SmileOutlined />,
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
              icon: <MehOutlined />,
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


  //展开节点时调用 (暂时弃用)
  onExpand = async (expandedKeys, info) => {
    if (info.expanded === true) {
      const response = await reqGetUserListByDepartmentId(info.node.key);
      var addlist = response.datas;
      var tree = this.state.tree;
      this.addData(tree, addlist, info.node.key);
    }
  };

  componentDidMount() {
    this.getDepartmentList();
    this.setState({
      name: '青渊渊',
      part: '测试部',
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
            onExpand={this.onExpand}
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