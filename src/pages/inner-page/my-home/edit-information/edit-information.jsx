import React from 'react';
import './edit-information.less';
import { Card, Descriptions, Avatar, Input, Select, Button, Upload, message } from 'antd';
import { UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import memoryUtils from '../../../../utils/memoryUtils';
import strorageUtils from '../../../../utils/strorageUtils';
import { reqChangeInformation, reqFindUser } from '../../../../api/link';

const { Option } = Select;
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class EditInformation extends React.Component {
  state = {
    loading: false,
    
    phone: null,
    email: null,
    address: null,
    status: 1,
    message: null,
  };


  change(e, f) {
    switch (f) {
      case 1:
        let tem1 =e.target.value;
        if (tem1.length < 1) {
         tem1 = null; 
        }
        this.setState({
          phone: tem1,
        });
        break;
      case 2:
        let tem2 =e.target.value;
        if (tem2.length < 1) {
         tem2 = null; 
        }
        this.setState({
          email: tem2,
        });
        break;
      case 3:
        let tem3 =e.target.value;
        if (tem3.length < 1) {
         tem3 = null; 
        }
        this.setState({
          address: tem3,
        });
        break;
      case 4:
        let tem4 =e.target.value;
        if (tem4.length < 1) {
         tem4 = null; 
        }
        this.setState({
          message: tem4,
        });
        break;
      default:
        break;
    }


  }

  statusChange = (value) => {
    this.setState({
      status: value,
    })
  }

  async changeInformation (id, phone, email, address, status, message) {
    const response = await reqChangeInformation(id, phone, email, address, status, message);
    if(response.code === 200) {
      const response2 = await reqFindUser(memoryUtils.user.username);
      const user = response2.data;
      console.log(user);
      
      memoryUtils.user = user;
      strorageUtils.saveUser(user);
    } 
    
    
  }

  //提交事件
  handleclick() {
    console.log(this.state.phone, this.state.email, this.state.address, this.state.status, this.state.message);
    this.changeInformation(memoryUtils.user.id, this.state.phone, this.state.email, this.state.address, this.state.status, this.state.message)
    
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  //设置初始值
  setValue() {
    this.setState({
      status: memoryUtils.user.status,
    })
  }

  UNSAFE_componentWillMount() {
    this.userIcom = memoryUtils.user.icon;
  }

  componentDidMount () {
    this.setValue();
    console.log(memoryUtils.user);
    
  }  

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">更换头像</div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
      <div
        className="edit-information"
        style={{ display: this.props.play === 'edit' ? 'block' : 'none' }}
      >
        <div className="information-container">
          <div className="left">
            <Card>
              <div className="img-container">
                <Avatar
                  src={this.userIcom}
                  style={{ marginBottom: '30px', minWidth: '80px' }}
                  shape="square"
                  size={80}
                  icon={<UserOutlined />}
                />

                {/* 更改头像 */}
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>


              </div>
              <Descriptions
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label="姓名">青渊渊</Descriptions.Item>
                <Descriptions.Item label="部门">测试部</Descriptions.Item>
                <Descriptions.Item label="联系电话">
                  <Input onChange={(e) => this.change(e, 1)} placeholder="请输入电话号码" />
                </Descriptions.Item>
                <Descriptions.Item label="电子邮箱">
                  <Input onChange={(e) => this.change(e, 2)} placeholder="请输入电子邮箱" />
                </Descriptions.Item>
                <Descriptions.Item label="工作位置">
                  <Input onChange={(e) => this.change(e, 3)} placeholder="输入工位位置" />
                </Descriptions.Item>
                <Descriptions.Item label="当前状态">
                  <Select onChange={(value) => this.statusChange(value)} defaultValue={this.state.status} style={{ marginLeft: '28px', width: 120 }}>
                    
                    <Option value={1}>空闲</Option>
                    <Option value={2}>繁忙</Option>
                    <Option value={3}>出差</Option>
                  </Select>
                </Descriptions.Item>
              </Descriptions>
              <div className="more">
                <div
                  style={{ marginRight: '10px', fontWeight: 'normal' }}
                >
                  留言:
                  </div>
                <div>
                  <TextArea
                    onChange={(e) => this.change(e, 4)}
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    style={{ marginLeft: '28px', width: 400 }}
                  />
                </div>
              </div>

              <div className="bt-container">
                <Button type="primary" onClick={() => this.handleclick() } style={{ margin: '0 10px' }}>提交</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}