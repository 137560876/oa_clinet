import React from 'react';
import { Button } from 'antd';
import './notice-main.less';

export default class NoticeMain extends React.Component {


  handleClick = (pos) => {
    const w = window.open('about:blank');
    w.location.href = ("/" + pos);

  }

  render() {

    return (
      <div className="notice-main">
        <div className="context">
          {this.props.context}
        </div>
        <Button type="link" onClick={() => { this.handleClick(this.props.pos) }} >
          全文链接
        </Button>
      </div>
    );
  }
}