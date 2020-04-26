import React from 'react';
import './power.less';
import { Tree, Button, Modal } from 'antd';
import { power } from '../../../mock/loginMock';
import { reqPower } from '../../../api/link';
import {
  DownOutlined,
  SmileOutlined,
  MehOutlined,
  SwapOutlined,
} from '@ant-design/icons';


const powerData = [
  {
    title: '0-0',
    key: '0-0',
    type: 0,//0为列表 1为权限
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        type: 0,
        children: [
          { title: '0-0-0-0', key: '0-0-0-0', type: 1 },
          { title: '0-0-0-1', key: '0-0-0-1', type: 1 },
          { title: '0-0-0-2', key: '0-0-0-2', type: 1 },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        type: 0,
        children: [
          { title: '0-0-1-0', key: '0-0-1-0', type: 1 },
          { title: '0-0-1-1', key: '0-0-1-1', type: 1 },
          { title: '0-0-1-2', key: '0-0-1-2', type: 1 },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
        type: 0,
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    type: 0,
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', type: 1 },
      { title: '0-1-0-1', key: '0-1-0-1', type: 1 },
      { title: '0-1-0-2', key: '0-1-0-2', type: 1 },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
    type: 0,
  },
];


const treeData = [

  {
    title: '公司总部',
    key: '0',
    isPerson: false,
    icon: <SmileOutlined />,
    children: [
      {
        title: '研发组',
        key: '0-0',
        isPerson: false,
        icon: <MehOutlined />,
        children: [
          {
            title: '开发人员1',
            key: '0-0-0',
            name: '开发人员1',
            part: '总公司',
            tel: '1234567',
            mail: '1237@qq.com',
            addr: '7楼 28-1',
            status: '空闲',
            command: '开发人员1的留言',
            isPerson: true,
            icon: <MehOutlined />,
          },
          {
            title: '开发人员2',
            key: '0-0-1',
            name: '开发人员2',
            part: '总公司',
            tel: '12345678',
            mail: '1237@qq.com',
            addr: '7楼 28-2',
            status: '繁忙',
            command: '开发人员2的留言',
            isPerson: true,
            icon: <MehOutlined />,
          },
          {
            title: '开发人员3',
            key: '0-0-2',
            name: '开发人员3',
            part: '总公司',
            tel: '1234567',
            mail: '1237@qq.com',
            addr: '7楼 28-3',
            status: '空闲',
            command: '开发人员3的留言',
            isPerson: true,
            icon: <MehOutlined />,
          },
        ]
      },
      {
        title: '产品组',
        key: '0-1',
        isPerson: false,
        icon: <MehOutlined />,
      },
      {
        title: '测试组',
        key: '0-2',
        isPerson: false,
        icon: <MehOutlined />,
      },
      {
        title: '测开组',
        key: '0-3',
        isPerson: false,
        icon: <MehOutlined />,
      }
    ]
  }
];


export default class Power extends React.Component {
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
      nowUserPowers: [],
      checkedKeys: ['0-0-0-0'],
    };

  }

  onCheck = (checkedKeys, info) => {
    var powerList = [];
    info.checkedNodes.forEach(item => {

      if (item.type === 1) {
        powerList.push(item.key);
      }
    });
    this.setcheckedKeys(powerList);
  }

  //获取用户权限的方法
  async getPowerList() {
    power();
    const response = await reqPower();
    console.log(response.powerList);
    this.setState({
      nowUserPowers: response.powerList,
      checkedKeys: response.powerList,
    })
  }

  //动态更新选中的节点
  setcheckedKeys(checkedKey) {
    this.setState({
      checkedKeys: checkedKey,
    })
  }

  onSelect = (selectedKeys, info) => {
    console.log(selectedKeys);
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

      //后端发起请求获取拥有的权限
      this.getPowerList();
    }
  }


  //重置返回用户原本的权限
  reSetPower = () => {
    this.setcheckedKeys(this.state.nowUserPowers);
  }

  //按下修改按钮后向服务器发起修改
  changePower = () => {
    Modal.success({
      title: '修改用户权限成功',
      okText: '确认',
    });
  }

  render() {

    return (
      <div className="power">
        <div className="person-list">
          <Tree
            showIcon
            onSelect={this.onSelect}
            defaultExpandAll
            height={540}
            switcherIcon={<DownOutlined />}
            treeData={treeData}
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
            treeData={powerData}
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