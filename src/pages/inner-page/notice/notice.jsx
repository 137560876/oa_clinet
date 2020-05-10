import React from 'react';
import { Alert } from 'antd';
import NoticeMain from '../../../components/notice-main/notice-main';
import { reqGetNotice, reqReadNotice } from '../../../api/link';
import memoryUtils from '../../../utils/memoryUtils';


export default class Notice extends React.Component {
  state = {
    noticeNode: [],
  }

  //关闭通知的回调函数
  async onClose(id) {
    const response = await reqReadNotice(this.userId, id);
    console.log(response);
  }


  //获取通知列表
  async getNoticeList(userId) {
    const response = await reqGetNotice(userId);
    if (response.code === 200) {
      let noticeList = response.datas;
      let noticeNode = this.getNoticeNode(noticeList);
      this.setState({
        noticeNode: noticeNode,
      })
    }

  }

  getNoticeNode(list) {
    return list.map(item => {
      var level = '';
      switch (item.level) {
        case 1:
          level = 'success';
          break;
        case 2:
          level = 'info';
          break;
        case 3:
          level = 'warning';
          break;
        case 4:
          level = 'error';
          break;
        default:
          break;
      }
      return (
        <Alert
          key={item.id}
          message={item.title}
          type={level}
          description={<NoticeMain context={item.context === null ? item.context : (item.context.substring(0, 50) + '...')} pos={"noticedetail/" + item.id} />}
          closable
          onClose={() => this.onClose(item.id)}
          showIcon
          style={{ marginBottom: '5px' }}
        />
      );
    }

    )
  }

  UNSAFE_componentWillMount() {
    this.userId = memoryUtils.user.id;
    this.getNoticeList(this.userId);
  }

  render() {

    return (
      <div className="notice">
        {
          this.state.noticeNode
        }
        {/* <Alert
          message="这是一则不紧急的通知"
          type="warning"
          description={<NoticeMain context="通知正文" pos={"noticedetail/1"} />}
          closable
          showIcon
          style={{ marginBottom: '5px' }}
        />
        <Alert
          message="这是一则紧急通知"
          type="error"
          description={<NoticeMain context="通知正文" pos={"noticedetail/1"} />}
          closable
          showIcon
          style={{ marginBottom: '5px' }}
        /> */}
      </div>
    );
  }
}