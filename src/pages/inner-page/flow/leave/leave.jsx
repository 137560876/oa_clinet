import React from 'react'
import { Card, Descriptions, Input, Select, DatePicker, Button, TimePicker, TreeSelect } from 'antd';
import { reqGetDepartmentList, reqGetUserListByDepartmentId, reqAddFlow } from '../../../../api/link';
import moment from 'moment';
import memoryUtils from '../../../../utils/memoryUtils';
import {
  UserOutlined,
} from '@ant-design/icons';
import './leave.less';

const dateFormat = 'YYYY-MM-DD';
const minFormat = 'HH:mm:ss';
const { Option } = Select;
const { TextArea } = Input;


export default class Leave extends React.Component {

  state = {
    value: undefined,

    departmentId: undefined,
    tree: [],

    title: "",
    type: "年假",
    startTime: "",
    startHms: "",
    endTime: "",
    endHms: "",
    cost: 0,
    spName: "",
    userId: undefined,
    remark: "",
  };
  //获得部门列表
  async getDepartmentList() {
    const response = await reqGetDepartmentList();

    var formatList = []
    //添加code判断
    var departmentList = response.datas;
    console.log(departmentList);
    for (let i in departmentList) {
      let obj = {
        id: departmentList[i].id,
        title: departmentList[i].name,
        value: departmentList[i].id,
        pId: departmentList[i].parentId,
      }
      formatList.push(obj);
    }

    this.setState({
      tree: formatList,
    })

  }

  onSelect = (value, node) => {
    if (node.isPerson) {
      this.setState({
        departmentId: value,
        spName: node.title,
        userId: node.userId,
      });
    }
  }

  onLoadData = (treeNode) => {
    console.log(treeNode);

    return new Promise(resolve => {

      reqGetUserListByDepartmentId(treeNode.key).then(
        resposne => {
          const addlist = resposne.datas;
          for (let k in addlist) {

            let obj = {
              id: addlist[k].id + 10000,
              title: addlist[k].name,
              key: addlist[k].id + 10000,
              value: addlist[k].id + 10000,
              username: addlist[k].username,
              isPerson: true,
              isLeaf: true,
              userId: addlist[k].id,
              icon: <UserOutlined />,
              pId: treeNode.key,
            }

            this.setState({
              tree: this.state.tree.concat([obj])
            })

          }


          resolve();
        }
      )
    });
  }

  //提交业务
  async addFlow(title, userId, userName, nextUserId, nextUsername, startHms,
    startDate, endDate, endHms, cost, type, status, remark) {
    const response = await reqAddFlow(title, userId, userName, nextUserId, nextUsername, startHms,
      startDate, endDate, endHms, cost, type, status, remark);
    console.log(response);

  }

  handelClick = () => {

    console.log(this.state.title, memoryUtils.user.id, memoryUtils.user.name, this.state.userId, this.state.spName,
      this.state.startHms, this.state.startTime, this.state.endTime, this.state.endHms, this.state.cost, this.state.type, 1, this.state.remark);
      this.addFlow(this.state.title, memoryUtils.user.id, memoryUtils.user.name, this.state.userId, this.state.spName,
      this.state.startHms, this.state.startTime, this.state.endTime, this.state.endHms, this.state.cost, this.state.type, 1, this.state.remark);
  }

  typeChange = (value) => {
    let tem;
    switch (value) {
      case "1":
        tem = "年假"
        break;
      case "2":
        tem = "事假"
        break;
      case "3":
        tem = "病假"
        break;
      default:
        tem = "年假"
        break;
    }
    this.setState({ type: tem });
  }

  startChange = (date, dateString) => {
    this.setState({
      startTime: dateString,
    })

  }

  changeStartHms = (time, timeString) => {
    this.setState({
      startHms: timeString
    })
    
  }
  
  changeEndHms = (time, timeString) => {
    this.setState({
      endHms: timeString
    })
    
  }

  endChange = (date, dateString) => {
    this.setState({
      endTime: dateString,
    })

  }

  change(e, f) {
    switch (f) {
      case 1:
        this.setState({
          title: e.target.value,
        });
        break;
      case 2:
        this.setState({
          cost: e.target.value,
        });
        break;
      case 3:
        this.setState({
          remark: e.target.value,
        });
        break;
      default:
        break;
    }
  }


  componentDidMount() {
    this.getDepartmentList();
  }

  render() {

    return (
      <div className="leave">
        <Card>
          <Descriptions
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="请假标题">
              <Input onChange={(e) => this.change(e, 1)} placeholder="请假标题" style={{ marginLeft: '28px', width: "250px" }} />
            </Descriptions.Item>
            <Descriptions.Item label="假期类型">
              <Select onChange={(value) => this.typeChange(value)} defaultValue="1" style={{ marginLeft: '28px', width: 120 }}>
                <Option value="1">年假</Option>
                <Option value="2">事假</Option>
                <Option value="3">病假</Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="请假开始时间">
              <DatePicker onChange={this.startChange} defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} />
              <TimePicker onChange={this.changeStartHms} style={{ marginLeft: '5px' }} defaultValue={moment('9:00:00', minFormat)} format={minFormat} />
            </Descriptions.Item>
            <Descriptions.Item label="预计结束时间">
              <DatePicker onChange={this.endChange} defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} />
              <TimePicker style={{ marginLeft: '5px' }} defaultValue={moment('18:00:00', minFormat)} format={minFormat} />
            </Descriptions.Item>
            <Descriptions.Item label="期间工作情况"><Input /></Descriptions.Item>
            <Descriptions.Item label="审批人">
              <TreeSelect
                treeDataSimpleMode
                style={{ marginLeft: '42px', width: '220px' }}
                value={this.state.departmentId}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.state.tree}
                placeholder="请选择"
                onSelect={this.onSelect}
                loadData={this.onLoadData}
              />
            </Descriptions.Item>
          </Descriptions>
          <div className="more">
            <div className="more-label">请假原由:</div>
            <TextArea onChange={(e) => this.change(e, 3)} autoSize={{ minRows: 4, maxRows: 8 }} style={{ marginLeft: '28px', width: 400 }} />
          </div>

          <div className="bt-container">
            <Button type="primary" onClick={this.handelClick} style={{ margin: '0 10px' }}>提交</Button>
          </div>
        </Card>
      </div>
    );
  }
}