import React from 'react';
import './information.less';
import { Card, Descriptions, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { reqWeather } from '../../../../api/link';
import memoryUtils from '../../../../utils/memoryUtils';

export default class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      up: '9:30',
      down: '18:30',
      upColor: '#F00000',
      downColor: '#66CC99',
      cond: '',//天气
      tmp: '',//温度
      wind_sc: '',//风力
      weather_status: true,

      name: "",
      position: "",
      sex: "",
      phone: "",
      email: "",
      headImgUrl: "",
      birthday: null,
      status: "",
      address: "",
      message: "",
    };

  }

  async getWeither() {
    const response = await reqWeather();
    if (response.HeWeather6[0].status === 'ok') {
      this.setState({
        weather_status: true,
        cond: response.HeWeather6[0].now.cond_txt,
        tmp: response.HeWeather6[0].now.tmp,
        wind_sc: response.HeWeather6[0].now.wind_sc,
      })
    } else {
      this.setState({
        weather_status: false,
      })
    }
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      name: memoryUtils.user.name,
      position: memoryUtils.user.position,
      phone: memoryUtils.user.phone,
      email: memoryUtils.user.email,
      headImgUrl: memoryUtils.user.headImgUrl,
      birthday: memoryUtils.user.birthday,
      address: memoryUtils.user.address,
      message: memoryUtils.user.message,
    })
    if (memoryUtils.user.status === 1) {
      this.setState({
        status: "空闲",
      })
    }
    if (memoryUtils.user.status === 2) {
      this.setState({
        status: "繁忙",
      })
    }
    if (memoryUtils.user.status === 3) {
      this.setState({
        status: "出差",
      })
    }
    if (memoryUtils.user.sex === 1) {
      this.setState({
        sex: "男",
      })
    }
    if (memoryUtils.user.sex === 2) {
      this.setState({
        sex: "女",
      })
    }
  }

  componentDidMount() {
    
    this.getWeither();
    this.setState({
      name: memoryUtils.user.name,
      position: memoryUtils.user.position,
      phone: memoryUtils.user.phone,
      email: memoryUtils.user.email,
      headImgUrl: memoryUtils.user.headImgUrl,
      birthday: memoryUtils.user.birthday,
      address: memoryUtils.user.address,
      message: memoryUtils.user.message,
    })
    if (memoryUtils.user.status === 1) {
      this.setState({
        status: "空闲",
      })
    }
    if (memoryUtils.user.status === 2) {
      this.setState({
        status: "繁忙",
      })
    }
    if (memoryUtils.user.status === 3) {
      this.setState({
        status: "出差",
      })
    }
    if (memoryUtils.user.sex === 1) {
      this.setState({
        sex: "男",
      })
    }
    if (memoryUtils.user.sex === 2) {
      this.setState({
        sex: "女",
      })
    }
  }

  UNSAFE_componentWillMount() {
    this.userIcom = memoryUtils.user.icon;
  }

  render() {

    return (
      <div
        className="information"
        style={{ display: this.props.play === 'information' ? 'block' : 'none' }}
      >
        <div className="information-container">
          <div className="left">
            <Card>
              <Avatar
                src={this.userIcom}
                style={{ marginBottom: '30px' }}
                shape="square"
                size={80}
                icon={<UserOutlined />}
              />
              <Descriptions
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label="姓名">{this.state.name}</Descriptions.Item>
                <Descriptions.Item label="职位">{this.state.position}</Descriptions.Item>
                <Descriptions.Item label="性别">{this.state.sex}</Descriptions.Item>
                <Descriptions.Item label="生日">{this.state.birthday}</Descriptions.Item>
                <Descriptions.Item label="联系电话">{this.state.phone}</Descriptions.Item>
                <Descriptions.Item label="电子邮箱">{this.state.email}</Descriptions.Item>
                <Descriptions.Item label="工作位置">{this.state.address}</Descriptions.Item>
                <Descriptions.Item label="当前状态">{this.state.status}</Descriptions.Item>
                <Descriptions.Item label="留言">
                  {this.state.message}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
          <div className="space"></div>
          <div className="right">
            <Card>
              <div style={{ display: this.state.weather_status ? 'block' : 'none' }}>
                <div className="sign-title">今日天气</div>
                <div>
                  <span className="sign">天气</span>
                  <span style={{ color: '#66CCFF' }} className="sign position"> {this.state.cond} </span>
                </div>
                <div>
                  <span className="sign">温度</span>
                  <span style={{ color: '#FF6666' }} className="sign position"> {this.state.tmp} ℃</span>
                </div>
                <div>
                  <span className="sign">风力</span>
                  <span style={{ color: '#FF9900' }} className="sign position"> {this.state.wind_sc} </span>
                </div>
              </div>
              <div style={{
                color: '#FF0033',
                display: this.state.weather_status ? 'none' : 'block'
              }} >
                <div className="sign-title">获取天气信息失败</div>
              </div>
            </Card>
            <Card style={{ marginTop: '30px' }}>
              <div className="sign-title">打卡信息</div>
              <div>
                <span className="sign">上班时间</span>
                <span style={{ color: this.state.upColor }} className="sign position"> {this.state.up} </span>
              </div>
              <div>
                <span className="sign">下班时间</span>
                <span style={{ color: this.state.downColor }} className="sign position"> {this.state.down} </span>
              </div>
            </Card>
          </div>
        </div>

      </div>
    );
  }
}