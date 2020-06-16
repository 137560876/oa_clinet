import React from 'react';
import './new-user.less';
import { Modal, Card, Descriptions, Input, Select, TreeSelect, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { reqAddNewUser, reqGetDepartmentList } from '../../../api/link';

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

export default class NewUser extends React.Component {
  state = {
    value: undefined,

    departmentId: undefined,
    username: "",
    password: "",
    name: "",
    partment: 0,
    phone: "",
    email: "",
    address: "",
    sex: 1,
    message: "",
    tree: [],
  };

  change(e, f) {
    switch (f) {
      case 1:
        this.setState({
          username: e.target.value,
        });
        break;
      case 2:
        this.setState({
          password: e.target.value,
        });
        break;
      case 3:
        this.setState({
          name: e.target.value,
        });
        break;
      case 4:
        this.setState({
          phone: e.target.value,
        });
        break;
      case 5:
        this.setState({
          email: e.target.value,
        });
        break;
      case 6:
        this.setState({
          address: e.target.value,
        });
        break;
      case 7:
        this.setState({
          message: e.target.value,
        });
        break;
      default:
        break;
    }


  }

  su() {
    confirm({
      title: '添加用户成功',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  fa() {
    confirm({
      title: '添加用户失败',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  //提交新增用户事务
  async addNewUser(username, password, name, phone, email, address, sex, message, departmentId) {
    const response = await reqAddNewUser(username, password, name, phone, email, address, sex, message, departmentId);

    return response;

  }

  //点击事件
  handleClick() {

    let re = this.addNewUser(this.state.username, this.state.password, this.state.name, this.state.phone,
      this.state.email, this.state.address, this.state.sex, this.state.message, this.state.departmentId);

    re.then((response) => {
      if (response.code === 200) {
        this.su();
      } else {
        this.fa();
      }

    })

  }

  //性别选择框
  sexChange = (value) => {
    this.setState({
      sex: value,
    })

  }

  onChange = (value) => {
    console.log(value);
    this.setState({ departmentId: value });
  };

  //处理列表
  formatList(list, obj) {

    for (let i in list) {

      if (list[i].parentId === obj.value) {

        let newObj = {
          title: list[i].name,
          value: list[i].id,
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

  //获得部门列表
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
          value: departmentList[i].id,
          parentId: departmentList[i].parentId,
        }
        formatList.push(obj);
        this.formatList(departmentList, obj);
      }
    }

    console.log(formatList);

    this.setState({
      tree: formatList,
    })

  }

  componentDidMount() {
    this.getDepartmentList();
  }

  render() {

    return (
      <div className="new-user">
        <div className="information-container">
          <div className="left">
            <Card>
              <Descriptions
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label="账号">
                  <Input style={{ marginLeft: '28px' }} onChange={(e) => this.change(e, 1)} placeholder="请输入账号/工号" />
                </Descriptions.Item>
                <Descriptions.Item label="密码">
                  <Input style={{ marginLeft: '28px' }} onChange={(e) => this.change(e, 2)} placeholder="请输入密码" />
                </Descriptions.Item>
                <Descriptions.Item label="姓名">
                  <Input style={{ marginLeft: '28px' }} onChange={(e) => this.change(e, 3)} placeholder="请输入姓名" />
                </Descriptions.Item>
                <Descriptions.Item label="部门">
                  <TreeSelect
                    style={{ marginLeft: '28px', width: '220px' }}
                    value={this.state.departmentId}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={this.state.tree}
                    placeholder="请选择"
                    treeDefaultExpandAll
                    onChange={this.onChange}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="联系电话">
                  <Input onChange={(e) => this.change(e, 4)} placeholder="请输入电话号码" />
                </Descriptions.Item>
                <Descriptions.Item label="电子邮箱">
                  <Input onChange={(e) => this.change(e, 5)} placeholder="请输入电子邮箱" />
                </Descriptions.Item>
                <Descriptions.Item label="工作位置">
                  <Input onChange={(e) => this.change(e, 6)} placeholder="输入工位位置" />
                </Descriptions.Item>
                <Descriptions.Item label="性别">
                  <Select onChange={(value) => this.sexChange(value)} defaultValue="1" style={{ marginLeft: '28px', width: 120 }}>
                    <Option value="1">男</Option>
                    <Option value="2">女</Option>
                  </Select>
                </Descriptions.Item>
              </Descriptions>
              <div className="more">
                <div
                  style={{ marginRight: '10px', fontWeight: 'normal' }}
                >
                  简介:
                  </div>
                <div>
                  <TextArea
                    onChange={(e) => this.change(e, 7)}
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    style={{ marginLeft: '28px', width: 400 }}
                  />
                </div>
              </div>

              <div className="bt-container">
                <Button type="primary" onClick={() => this.handleClick()} style={{ margin: '0 10px' }}>提交</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}