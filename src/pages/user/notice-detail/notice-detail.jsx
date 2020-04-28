import React from 'react';
import { Layout, Card, Typography } from 'antd';
import HeaderTop from '../../../components/header/header';
import './notice-detail.less';
import { getNotice } from '../../../mock/loginMock';
import { reqNotice } from '../../../api/link';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default class NoticeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      time: '',
      context: '',
    };
  }

  //获取通知详情
  async getNotice() {
    getNotice();
    const response = await reqNotice();
    this.setState({
      title: response.data.title,
      time: response.data.time,
      context: response.data.context,
    })
  }
  componentDidMount() {
    this.getNotice();
    console.log(this.props.match.params.id)
  }
  render() {

    return (
      <div className="notice-detail">
        <Layout style={{ height: '100%' }}>
          <HeaderTop />
          <Content className="content">
            <Card style={{ marginTop: '30px', minHeight: '80vh', background: '#F0F2F5' }}>
              <Typography>
                <Title style={{ textAlign: "center" }}>{this.state.title}</Title>
                <Paragraph style={{ textAlign: "center" }}>
                  <Text>{this.state.time}</Text>
                </Paragraph>
                <Paragraph>
                  <div dangerouslySetInnerHTML={{ __html:this.state.context}}></div>
                </Paragraph>
              </Typography>
            </Card>,
          </Content>
        </Layout>
      </div>
    );
  }
}