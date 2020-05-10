import React from 'react';
import './push-notice.less';
import { Card, Input, Divider, Radio, Button } from 'antd';
import { reqPublishNotice } from '../../../api/link';
import memoryUtils from '../../../utils/memoryUtils.js';

const { TextArea } = Input;

export default class PushNotice extends React.Component {
  state = {
    title: "",
    context: "",
    level: 1,
  }

  //获取等级选择内容
  onChange = (e) => {
    this.setState({
      level: e.target.value,
    })
  }

  //获取title输入框内的内容
  handelTitle = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  //获取正文输入框内容
  handleContext = (e) => {
    this.setState({
      context: e.target.value,
    })
    
  }

  //发布逻辑
  async publish (userId, title, context, level) {
    const response = await reqPublishNotice(userId, title, context, level);
    console.log(response);
    
  }

  handelClick = () => {
    const userId = memoryUtils.user.id;
    console.log(userId, this.state.title, this.state.context, this.state.level);
    this.publish(userId, this.state.title, this.state.context, this.state.level);
  }

  render() {

    return (
      <div className="push-notice">

        <Card style={{ marginLeft: '40px', width: '800px' }}>
          <Input
            onChange={this.handelTitle}
            style={{ height: '50px' }}
            placeholder="请输入标题"
          />
          <TextArea
            onChange={this.handleContext}
            placeholder="请输入通知正文"
            style={{ marginTop: '10px' }}
            rows={20}
          />
        </Card>
        <Card style={{ marginLeft: '30px', width: '300px' , maxHeight: '350px' }}>
          <div className="title">通知等级</div>
          <Divider />
          <div className="level-container">
            <Radio.Group onChange={this.onChange} defaultValue={1}>
              <Radio.Button value={1}>平常</Radio.Button>
              <Radio.Button value={2}>通知</Radio.Button>
              <Radio.Button value={3}>注意</Radio.Button>
              <Radio.Button value={4}>紧急</Radio.Button>
            </Radio.Group>
          </div>
          <Divider />
          <Button type="primary" onClick={this.handelClick} block>发布</Button>
        </Card>
      </div>
    );
  }
}