import React from 'react';
import './push-notice.less';
import { Card, Input, Divider, Radio, Button } from 'antd';

const { TextArea } = Input;

export default class PushNotice extends React.Component {

  onChange = (e) => {
    console.log(e);
  }

  render() {

    return (
      <div className="push-notice">

        <Card style={{ marginLeft: '40px', width: '800px' }}>
          <Input
            style={{ height: '50px' }}
            placeholder="请输入标题"
          />
          <TextArea
            placeholder="请输入通知正文"
            style={{ marginTop: '10px' }}
            rows={20}
          />
        </Card>
        <Card style={{ marginLeft: '30px', width: '300px' , maxHeight: '350px' }}>
          <div className="title">通知等级</div>
          <Divider />
          <div className="level-container">
            <Radio.Group onChange={this.onChange} defaultValue="success">
              <Radio.Button value="success">平常</Radio.Button>
              <Radio.Button value="info">通知</Radio.Button>
              <Radio.Button value="warning">注意</Radio.Button>
              <Radio.Button value="error">紧急</Radio.Button>
            </Radio.Group>
          </div>
          <Divider />
          <Button type="primary" block>发布</Button>
        </Card>
      </div>
    );
  }
}