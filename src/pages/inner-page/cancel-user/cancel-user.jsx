import React from 'react';
import './cancel-user.less';
import { Tree, Descriptions, Card, Button, Divider, Modal } from 'antd';
import {
  ExclamationCircleOutlined,
  DownOutlined,
  SmileOutlined,
  MehOutlined,
} from '@ant-design/icons';

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

export default class CancelUser extends React.Component {
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
    };

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

      },
      onCancel() {
      },
    });
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
    }
  }

  componentDidMount() {
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
      <div className="cancel-user">
        <div className="person-container">
          <Tree
            showIcon
            onSelect={this.onSelect}
            defaultExpandAll
            height={540}
            defaultSelectedKeys={['0-0-0']}
            switcherIcon={<DownOutlined />}
            treeData={treeData}
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