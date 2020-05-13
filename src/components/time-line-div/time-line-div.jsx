import React from 'react';
import './time-line-div.less';


export default class TimeLineDiv extends React.Component {

  render() {

    return (
      <div className="time-line-div">
        <div className="status">{this.props.view}</div>
        <div className="person">
          处理人 : <span style={{marginRight: '70px'}}>{this.props.person}</span>
        </div>
        <div className="line"></div>
        <div>
          处理时间 :  <span style={{marginLeft: '30px'}}>{this.props.time}</span>
        </div>
      </div>
    );
  }
}