import React from 'react';
import { Alert } from 'antd';
import NoticeMain from '../../../components/notice-main/notice-main';


export default class Notice extends React.Component {

  render() {

    return (
      <div className="notice">
        <Alert
          message="这是一则不紧急的通知"
          type="warning"
          description={<NoticeMain context="通知正文" pos={"noticedetail/1"} />}
          closable
          showIcon
          style={{marginBottom: '5px'}}
        />
        <Alert
          message="这是一则紧急通知"
          type="error"
          description={<NoticeMain context="通知正文" pos={"noticedetail/1"} />}
          closable
          showIcon
          style={{marginBottom: '5px'}}
        />
      </div>
    );
  }
}