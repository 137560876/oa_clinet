import React from 'react';
import { Calendar, Statistic, Tag, Modal, Button, Alert, Steps } from 'antd';
import { formateDate } from '../../../utils/timeUtils';
import { reqGetSignList, reqUpSign, reqOutSign } from '../../../api/link';
import memoryUtils from '../../../utils/memoryUtils';
import moment from 'moment';
import './sign-in.less';

const { Step } = Steps;

export default class SignIn extends React.Component {


  state = {
    userId: 0,
    visible: false,
    confirmLoading: false,
    currentTime: formateDate(Date.now()),//当前时间字符串
    signList: [],//后端请求打卡数据

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
        case 1:
          listData = [
            { color: 'green', content: '正常' }
          ];
          break;
        case 2:
          listData = [
            { color: 'red', content: '迟到' }
          ];
          break;
        case 3:
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

  //打卡
  async handleClose() {
    //上班打卡
    if (this.state.step === 0) {
      await reqUpSign(this.state.userId);
    }
    //下班打卡
    if (this.state.step === 1) {
      await reqOutSign(this.state.userId);
    }

    this.getSignList(this.state.userId);
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

  close() {
    this.setState({
      visible: false,
    });
  }

  async getSignList(userId) {
    const response = await reqGetSignList(userId);
    if (response.code === 200) {
      var list = response.datas;
      var signList = [];
      for (let i in list) {
        var statu = 0;
        var goS = 'wait';
        var outS = 'wait';

        /* 处理上下班状态 */
        if (list[i].goStatus === 1) {
          goS = 'finish';
        }

        if (list[i].goStatus === 2) {
          goS = 'error';
        }
        if (list[i].outStatus === 1) {
          outS = 'finish';
        }

        if (list[i].outStatus === 2) {
          outS = 'error';
        }
        if (list[i].goStatus === 1 && list[i].outStatus === 1) {
          statu = 1;
        }
        if (list[i].goStatus === 3 && list[i].outStatus === 3) {
          statu = 3;
        }
        if (list[i].goStatus === 2 && list[i].outStatus === 2) {
          statu = 2;
        }
        let sign = {
          date: list[i].date,
          go: list[i].goTime,
          out: list[i].outTime,
          goS: goS,//上班正常
          outS: outS, //下班正常
          status: statu,//正常 green
          step: list[i].step, //打卡进度 0为上班 1为下班 2为全流程结束
        }
        signList.push(sign)
      }

      this.setState({
        signList: signList,
      });
    }



  }


  componentDidMount() {
    this.getTime();
    this.setState({
      userId: memoryUtils.user.id,
    });
    this.userId = memoryUtils.user.id;
    this.getSignList(this.userId);

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
              <Button key="back" type="primary" onClick={() => this.close()}>关闭</Button>,
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
            onClick={() => this.handleClose()}
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