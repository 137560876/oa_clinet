import React from 'react';
import { Layout, Card, Typography } from 'antd';
import memoryUtils from '../../../utils/memoryUtils';
import { withRouter } from 'react-router-dom';
import HeaderTop from '../../../components/header/header';
import './notice-detail.less';
import { reqNotice, reqReadNotice } from '../../../api/link';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      time: '',
      context: '',
    };
  }

  //获取通知详情
  async getNotice(id) {
    const response = await reqNotice(id);
    console.log(response);
    if (response.code === 200) {
      this.setState({
        title: response.data.title,
        context: response.data.contextHtml,
      })

      const userId = memoryUtils.user.id;
      const res = await reqReadNotice(userId, id);
      console.log(res);
      
    }


    
  }

  componentDidMount() {
    const noticeId = this.props.match.params.id;
    const user = memoryUtils.user;
    if (!user || !user.id) {
      // 自动跳转到登录
      this.props.history.replace('/login');
    }
    this.getNotice(noticeId);
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

export default withRouter(NoticeDetail);