import React from 'react';
import { Calendar, Statistic, Tag, Modal, Button, Alert, Steps } from 'antd';
import { formateDate } from '../../../utils/timeUtils';
import moment from 'moment';
import './sign-in.less';

const { Step } = Steps;

export default class SignIn extends React.Component {


  state = {
    visible: false,
    confirmLoading: false,
    currentTime: formateDate(Date.now()),//当前时间字符串
    signList: [
      {
        date: '2020-04-01',
        go: '8:00',
        out: '17:00',
        goS: 'finish',//上班正常
        outS: 'finish', //下班正常
        status: 0,//正常 green
        step: 2, //打卡进度 0为上班 1为下班 2为全流程结束
      },
      {
        date: '2020-04-02',
        go: '10:00',
        out: '17:00',
        goS: 'error',//上班异常
        outS: 'finish', //下班正常
        status: 1,//异常
        step: 2,
      },
      {
        date: '2020-04-03',
        go: '',
        out: '',
        goS: 'wait',
        outS: 'wait',
        status: 2,//请假
        step: 2,
      },
      {
        date: '2020-04-24',
        go: '',
        out: '',
        goS: 'process',
        outS: 'wait',
        status: 3,//流程还未完全结束 状态设为3
        step: 0,
      }
    ],//后端请求打卡数据

    thisGoS: 'wait',//某日的上班情况 0默认wait
    thisOutS: 'wait',//某日下班情况 0默认wait
    thisGo: '9:00', //某日上班时间 9:00 默认
    thisOut: '18:00', //某日下班时间 18:00 默认
    isNowDay: 'none', //对话框显示日期是否为今日
    thisDay: '2020-4-1', //对话框的日期
    step: 0,//对话框当前步骤，默认0
  }

  getListData = (value) => {
    let listData = [];
    var selectDay = moment(value).format('YYYY-MM-DD');
    var time = this.state.signList.find(function (e) { return e.date === selectDay })
    if (time !== undefined) {
      switch (time.status) {
        case 0:
          listData = [
            { color: 'green', content: '正常' }
          ];
          break;
        case 1:
          listData = [
            { color: 'red', content: '迟到' }
          ];
          break;
        case 2:
          listData = [
            { color: 'blue', content: '请假' }
          ];
          break;
        default:
      }
    }

    return listData || [];
  }

  dateCellRender = (value) => {
    const listData = this.getListData(value);
    return (
      <div>
        {listData.map(item => (
          <div key={item.content}>
            <Tag color={item.color} style={{ margin: "0 auto", fontSize: "8px", cursor: "pointer" }}>{item.content}</Tag>
          </div>
        ))}
      </div>
    );
  }

  onPanelChange = (value) => {
    var thisDay = moment(value).format('YYYY-MM-DD');
    
    var time = this.state.signList.find(function (e) { return e.date === thisDay }); //查找当日打卡情况
    
    if (time !== undefined) {
      this.setState({
        thisGoS: time.goS,//某日的上班情况 0默认
        thisOutS: time.outS,//某日下班情况 0默认
        thisGo: time.go, //某日上班时间 9:00 默认
        thisOut: time.out, //某日下班时间 18:00 默认
        thisDay: thisDay, //对话框的日期
        step: time.step,//对话框当前步骤，默认0
      })
      
      if (thisDay === moment().locale('zh-cn').format('YYYY-MM-DD')) {
        this.setState({
          isNowDay: 'inline'
        })
      } else {
        this.setState({
          isNowDay: 'none'
        })
      }
    } else {
      this.setState({
        thisGoS: 'wait',//某日的上班情况 0默认
        thisOutS: 'wait',//某日下班情况 0默认
        thisGo: '', //某日上班时间 9:00 默认
        thisOut: '', //某日下班时间 18:00 默认
        thisDay: thisDay, //对话框的日期
        step: 0,//对话框当前步骤，默认0
      })

      if (thisDay === moment().locale('zh-cn').format('YYYY-MM-DD')) {
        this.setState({
          isNowDay: 'inline'
        })
      } else {
        this.setState({
          isNowDay: 'none'
        })
      }
    }

    this.setState({
      visible: true,
    });
  };

  //点击按钮 提交打卡事务
  handleClick = () => {
    var thisDay = moment().locale('zh-cn').format('YYYY-MM-DD');
    
    var time = this.state.signList.find(function (e) { return e.date === thisDay }); //查找当日打卡情况
    
    if (time !== undefined) {
      this.setState({
        thisGoS: time.goS,//某日的上班情况 0默认
        thisOutS: time.outS,//某日下班情况 0默认
        thisGo: time.go, //某日上班时间 9:00 默认
        thisOut: time.out, //某日下班时间 18:00 默认
        thisDay: thisDay, //对话框的日期
        step: time.step,//对话框当前步骤，默认0
      })
      
      if (thisDay === moment().locale('zh-cn').format('YYYY-MM-DD')) {
        this.setState({
          isNowDay: 'inline'
        })
      } 
    } else {
      this.setState({
        thisGoS: 'wait',//某日的上班情况 0默认
        thisOutS: 'wait',//某日下班情况 0默认
        thisGo: '', //某日上班时间 9:00 默认
        thisOut: '', //某日下班时间 18:00 默认
        thisDay: thisDay, //对话框的日期
        step: 0,//对话框当前步骤，默认0
      })

      if (thisDay === moment().locale('zh-cn').format('YYYY-MM-DD')) {
        this.setState({
          isNowDay: 'inline'
        })
      } 
    }

    this.setState({
      visible: true,
    });
  }

  //右上角关闭对话框
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  //关闭对话框
  handleClose = () => {
    this.setState({
      visible: false,
    });
  }

  /**
   * 获取当前时间
   */
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000)
  }

  componentDidMount() {
    this.getTime();
  }

  /**
   * 卸载计时器
   */
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {

    return (
      <div className="sign-in">

        {/* 今日打卡 ，平时隐藏 */}
        <Modal
          title="打卡信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={
            [
              <Button key="back" type="primary" onClick={this.handleClose}>关闭</Button>,
            ]
          }>

          {/* 对话框主体  */}
          <Alert message={this.state.thisDay + "打卡情况"}
            type="info"
            style={{ marginTop: 10, marginBottom: 20 }}
            showIcon
          />
          <Steps current={this.state.step} style={{ marginTop: 10, marginBottom: 20 }}>
            <Step title="上班时间" status={this.state.thisGoS} description={this.state.thisGo} />
            <Step title="下班时间" status={this.state.thisOutS} description={this.state.thisOut} />
          </Steps>
          <Button
            type="primary"
            onClick={this.handleClose}
            style={{ marginTop: 10, marginBottom: 20, height: 40, fontWeight: "bolder", display: this.state.isNowDay }}
            block>
            打卡  {moment().format('HH:mm:ss')}</Button>
        </Modal>

        <div className="site-calendar-demo-card">
          <Calendar
            fullscreen={true}
            onSelect={this.onPanelChange}
            dateCellRender={this.dateCellRender}
          />
        </div>
        <div className="run-container">
          <div>
            <div className="main-des">本月概况</div>
            <div className="num-contanier">
              <div className="box-card">
                <Statistic
                  title="正常打卡"
                  value={11}
                  valueStyle={{ color: '#66CC99' }}
                  suffix="次"
                />
              </div>
              <div className="box-card">
                <Statistic
                  title="异常打卡"
                  value={9}
                  valueStyle={{ color: '#F00000' }}
                  suffix="次"
                />
              </div>
              <div className="box-card">
                <Statistic
                  title="请假次数"
                  value={9}
                  valueStyle={{ color: '#66CCFF' }}
                  suffix="次"
                />
              </div>
            </div>
          </div>
          <div className="bt-container">

            <button id="my-button" className="my-button" onClick={this.handleClick}>打卡</button>
            <div className="bg"></div>
          </div>
          <div className="time-container">
            {this.state.currentTime}
          </div>
        </div>
      </div>
    );
  }
}