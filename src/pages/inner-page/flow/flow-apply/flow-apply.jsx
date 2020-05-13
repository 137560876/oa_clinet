import React from 'react';
import { Card, Descriptions, Input, Select, DatePicker, Button, TreeSelect } from 'antd';
import { reqGetDepartmentList, reqGetUserListByDepartmentId, reqAddFlow } from '../../../../api/link';
import moment from 'moment';
import memoryUtils from '../../../../utils/memoryUtils';
import './flow-apply.less';
import {
  UserOutlined,
} from '@ant-design/icons';

const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;
const { TextArea } = Input;

export default class FlowApply extends React.Component {
  state = {
    value: undefined,

    departmentId: undefined,
    tree: [],

    title: "",
    type: "请假",
    startTime: "",
    endTime: "",
    cost: undefined,
    spName: "",
    userId: undefined,
    remark: "",
  };

  //处理列表
  formatList(list, obj) {

    for (let i in list) {

      if (list[i].parentId === obj.value) {

        let newObj = {
          title: list[i].name,
          value: list[i].id,
          parentId: list[i].parentId,
          chilren: [],
        }
        if (obj.children === undefined) {
          obj.children = [];
          obj.children.push(newObj);
        } else {
          obj.children.push(newObj);
        }
        this.formatList(list, newObj);
      }
    }
  }

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

    console.log(this.state.title, this.state.type, this.state.startTime,
      this.state.endTime, this.state.cost, this.state.spName, this.state.userId, this.state.remark);
    this.addFlow(this.state.title, memoryUtils.user.id, memoryUtils.user.name, this.state.userId, this.state.spName,
      "00:00:00", this.state.startTime, this.state.endTime, "00:00:00", this.state.cost, this.state.type, 1, this.state.remark);
  }

  typeChange = (value) => {
    let tem;
    switch (value) {
      case "1":
        tem = "请假"
        break;
      case "2":
        tem = "报销"
        break;
      case "3":
        tem = "出差"
        break;
      default:
        tem = "请假"
        break;
    }
    this.setState({ type: tem });
  }

  startChange = (date, dateString) => {
    this.setState({
      startTime: dateString,
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
      <div className='flow-apply'>
        <Card>
          <Descriptions
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="任务标题">
              <Input placeholder="任务标题" onChange={(e) => this.change(e, 1)} style={{ marginLeft: '28px', width: "250px" }} />
            </Descriptions.Item>
            <Descriptions.Item label="流程类型">
              <Select onChange={(value) => this.typeChange(value)} defaultValue="1" style={{ marginLeft: '28px', width: 120 }}>
                <Option value="1">请假</Option>
                <Option value="2">报销</Option>
                <Option value="3">出差</Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="预计开始时间">
              <DatePicker onChange={this.startChange} defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} />
            </Descriptions.Item>
            <Descriptions.Item label="预计结束时间">
              <DatePicker onChange={this.endChange} defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} />
            </Descriptions.Item>
            <Descriptions.Item label="费用预算">
              <Input style={{ marginLeft: '28px' }} onChange={(e) => this.change(e, 2)} prefix="￥" suffix="RMB" />
            </Descriptions.Item>
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
            <div className="more-label">流程备注:</div>
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