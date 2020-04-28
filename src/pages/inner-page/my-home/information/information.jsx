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


  componentDidMount() {
    this.getWeither();
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
                <Descriptions.Item label="姓名">青渊渊</Descriptions.Item>
                <Descriptions.Item label="部门">测试部</Descriptions.Item>
                <Descriptions.Item label="联系电话">15988812345</Descriptions.Item>
                <Descriptions.Item label="电子邮箱">137000@qq.com</Descriptions.Item>
                <Descriptions.Item label="工作位置">总公司7楼 28-5</Descriptions.Item>
                <Descriptions.Item label="当前状态">空闲</Descriptions.Item>
                <Descriptions.Item label="留言">
                  无留言
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