import React from 'react'
import { Card, Descriptions, Input, Select, DatePicker, Button, TimePicker } from 'antd';
import moment from 'moment';
import './leave.less';

const dateFormat = 'YYYY-MM-DD';
const minFormat = 'HH:mm';
const { Option } = Select;
const { TextArea } = Input;

export default class Leave extends React.Component {

  render() {

    return (
      <div className="leave">
        <Card>
          <Descriptions
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="请假标题"><Input placeholder="请假标题" style={{ marginLeft: '28px', width: "250px" }} /></Descriptions.Item>
            <Descriptions.Item label="假期类型">
              <Select defaultValue="1" style={{ marginLeft: '28px', width: 120 }}>
                <Option value="1">年假</Option>
                <Option value="2">事假</Option>
                <Option value="3">病假</Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="请假开始时间">
              <DatePicker defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} />
              <TimePicker style={{marginLeft: '5px'}} defaultValue={moment('9:00', minFormat)} format={minFormat} />
            </Descriptions.Item>
            <Descriptions.Item label="预计结束时间">
              <DatePicker defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} />
              <TimePicker style={{marginLeft: '5px'}} defaultValue={moment('18:00', minFormat)} format={minFormat} />
            </Descriptions.Item>
            <Descriptions.Item label="期间工作情况"><Input /></Descriptions.Item>
            <Descriptions.Item label="联系方式"><Input placeholder="请填写紧急联系电话" style={{ marginLeft: '28px', width: "250px" }}></Input></Descriptions.Item>
          </Descriptions>
          <div className="more">
            <div className="more-label">请假原由:</div>
            <TextArea autoSize={{ minRows: 4, maxRows: 8 }} style={{ marginLeft: '28px', width: 400 }} />
          </div>

          <div className="bt-container">
            <Button type="primary" style={{ margin: '0 10px' }}>提交</Button>
          </div>
        </Card>
      </div>
    );
  }
}