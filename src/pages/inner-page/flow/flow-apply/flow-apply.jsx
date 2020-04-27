import React from 'react';
import { Card, Descriptions, Input, Select, DatePicker, Button } from 'antd';
import moment from 'moment';
import './flow-apply.less';

const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;
const { TextArea } = Input;

export default class FlowApply extends React.Component {

  render() {
    return (
      <div className='flow-apply'>
        <Card>
          <Descriptions
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="任务标题"><Input placeholder="任务标题" style={{ marginLeft: '28px', width: "250px" }} /></Descriptions.Item>
            <Descriptions.Item label="流程类型">
              <Select defaultValue="1" style={{ marginLeft: '28px', width: 120 }}>
                <Option value="1">请假</Option>
                <Option value="2">报销</Option>
                <Option value="3">出差</Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="预计开始时间">
              <DatePicker defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} />
            </Descriptions.Item>
            <Descriptions.Item label="预计结束时间">
              <DatePicker defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} />
            </Descriptions.Item>
            <Descriptions.Item label="费用预算"><Input style={{ marginLeft: '28px' }} prefix="￥" suffix="RMB" /></Descriptions.Item>
            <Descriptions.Item label="联系方式"><Input placeholder="请填写紧急联系电话" style={{ marginLeft: '28px', width: "250px" }}></Input></Descriptions.Item>
          </Descriptions>
          <div className="more">
            <div className="more-label">流程备注:</div>
            <TextArea autoSize={{ minRows: 4, maxRows: 8 }} style={{ marginLeft: '28px', width: 400 }} />
          </div>

          <div className="bt-container">
            <Button type="primary" style={{margin: '0 10px'}}>提交</Button>
          </div>
        </Card>
      </div>
    );
  }
}