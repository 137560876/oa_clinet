import React from 'react';
import './edit-information.less';
import { Card, Descriptions, Avatar, Input, Select, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import memoryUtils from '../../../../utils/memoryUtils';

const { Option } = Select;
const { TextArea } = Input;

export default class EditInformation extends React.Component {


  UNSAFE_componentWillMount() {
    this.userIcom = memoryUtils.user.icon;
  }


  render() {

    return (
      <div
        className="edit-information"
        style={{ display: this.props.play === 'edit' ? 'block' : 'none' }}
      >
        <div className="information-container">
          <div className="left">
            <Card>
              <Avatar
                src={this.userIcom}
                style={{ marginBottom: '30px' }}
                shape="square"
                size={80}
                icon={<UserOutlined />}
              />
              <Descriptions
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label="姓名">青渊渊</Descriptions.Item>
                <Descriptions.Item label="部门">测试部</Descriptions.Item>
                <Descriptions.Item label="联系电话">
                  <Input defaultValue='15988821971' placeholder="请输入电话号码" />
                </Descriptions.Item>
                <Descriptions.Item label="电子邮箱">
                  <Input defaultValue='137560876@qq.com' placeholder="请输入电子邮箱" />
                </Descriptions.Item>
                <Descriptions.Item label="工作位置">
                  <Input defaultValue='总公司7楼 28-5' placeholder="输入工位位置" />
                </Descriptions.Item>
                <Descriptions.Item label="当前状态">
                  <Select defaultValue="1" style={{ marginLeft: '28px', width: 120 }}>
                    <Option value="1">空闲</Option>
                    <Option value="2">繁忙</Option>
                    <Option value="3">出差</Option>
                  </Select>
                </Descriptions.Item>
              </Descriptions>
              <div className="more">
                <div
                  style={{ marginRight: '10px', fontWeight: 'normal' }}
                >
                  留言:
                  </div>
                <div>
                  <TextArea
                    defaultValue={"无留言"}
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