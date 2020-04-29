import React from 'react';
import './new-user.less';
import { Card, Descriptions, Input, Select, TreeSelect, Button } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const treeData = [
  {
    title: '研发总部',
    value: '0-0',
    children: [
      {
        title: '测试部',
        value: '0-0-1',
      },
      {
        title: '开发部',
        value: '0-0-2',
      },
    ],
  },
  {
    title: '产品部',
    value: '0-1',
  },
];

export default class NewUser extends React.Component {
  state = {
    value: undefined,
  };

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  };

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
                  <Input style={{marginLeft: '28px'}} placeholder="请输入账号/工号" />
                </Descriptions.Item>
                <Descriptions.Item label="密码">
                  <Input style={{marginLeft: '28px'}} placeholder="请输入密码" />
                </Descriptions.Item>
                <Descriptions.Item label="姓名">
                  <Input style={{marginLeft: '28px'}} placeholder="请输入姓名" />
                </Descriptions.Item>
                <Descriptions.Item label="部门">
                  <TreeSelect
                    style={{marginLeft: '28px', width: '150px' }}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    placeholder="请选择"
                    treeDefaultExpandAll
                    onChange={this.onChange}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="联系电话">
                  <Input placeholder="请输入电话号码" />
                </Descriptions.Item>
                <Descriptions.Item label="电子邮箱">
                  <Input placeholder="请输入电子邮箱" />
                </Descriptions.Item>
                <Descriptions.Item label="工作位置">
                  <Input placeholder="输入工位位置" />
                </Descriptions.Item>
                <Descriptions.Item label="性别">
                  <Select defaultValue="1" style={{ marginLeft: '28px', width: 120 }}>
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
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    style={{ marginLeft: '28px', width: 400 }}
                  />
                </div>
              </div>

              <div className="bt-container">
                <Button type="primary" style={{ margin: '0 10px' }}>提交</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}