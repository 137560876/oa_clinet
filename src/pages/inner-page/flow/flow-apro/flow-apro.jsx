import React from 'react';
import { Card, Table, Button, Modal, Descriptions, Timeline, Collapse, Select, Input, TreeSelect } from 'antd';
import { reqGetAproFlow, reqGetAproNum, reqFindFlowById, 
  reqAproFlow, reqGetFlowMain, reqGetDepartmentList, reqGetUserListByDepartmentId } from '../../../../api/link';
import TimeDiv from '../../../../components/time-line-div/time-line-div';
import { formatStatus } from '../../../../utils/FlowStatusUtils';
import { colorStatus } from '../../../../utils/greenUtils';
import memoryUtils from '../../../../utils/memoryUtils';
import {
  UserOutlined,
} from '@ant-design/icons';
import './flow-apro.less';

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

export default class FlowApro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departmentId: undefined,
      tree: [],

      num: 0,
      pagination: {
        current: 1,
        pageSize: 5,
        total: 200,
      },
      loading: false,
      dataSource: [],
      visible: false,
      SPvisible: false,

      title: "",
      id: "",
      userName: "",
      type: "",
      status: "",
      cost: undefined,
      startTime: "",
      endTime: "",
      remark: "",

      flow: [],

      theFlowId: undefined,
      myStatus: 1,
      nextUserId: undefined,
      nextUsername: "",
      myRemark: "",
    };

  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  //获取全部流程
  async getDataSource(start, limit) {
    this.setState({
      loading: true,
    })
    const response = await reqGetAproFlow((start - 1) * 5, limit, memoryUtils.user.id);
    let formatList = response.datas;
    for (let i in formatList) {
      formatList[i].status = formatStatus(formatList[i].status);
    }

    this.setState({
      dataSource: formatList,
      pagination: {
        current: start,
        pageSize: limit,
        total: this.state.num,
      },
      loading: false,
    })

  }

  //获取流程时间图
  async getFlowMain(id) {
    const response = await reqGetFlowMain(id);
    const list = response.datas;
    let listNode = [];
    for (let i in list) {
      if (list[i].status === 0) {
        listNode.push(
          <Timeline.Item key={list[i].userId} color={colorStatus(list[i].status)}>
            <TimeDiv
              view={"待审批"}
              person={list[i].userName}
              time={list[i].time}
            />
          </Timeline.Item>
        )
      } else {
        listNode.push(
          <Timeline.Item key={list[i].userId} color={colorStatus(list[i].status)}>
            <TimeDiv
              view={list[i].remark}
              person={list[i].userName}
              time={list[i].time}
            />
          </Timeline.Item>
        )
      }

    }

    this.setState({
      flow: listNode,
    })

  }

  //点击查看详情时间
  handleMore = (record) => {
    console.log(record.id);
    this.getFlow(record.id);
    this.getFlowMain(record.id);
    //通过id查找到相应的流程详情，弹窗显示
    this.setState({
      visible: true,
    })
  }

  handleSP = (record) => {
    console.log("审批任务" + record.id);
    this.setState({
      SPvisible: true,
      theFlowId: record.id,
      myStatus: 1,
      nextUserId: undefined,
      nextUsername: "",
      myRemark: "",
    });
  }

  SPhandleOk = e => {

    this.setState({
      SPvisible: false,
    });
  };

  SPhandleCancel = e => {
    this.setState({
      SPvisible: false,
    });
  };

  /** 表格相关 */
  onchange = (pagination) => {
    this.getDataSource(pagination.current, pagination.pageSize);
  }

  //获取具体流程
  async getFlow(id) {
    const response = await reqFindFlowById(id);
    console.log(response);

    this.setState({
      title: response.data.title,
      id: response.data.id,
      userName: response.data.userName,
      type: response.data.type,
      status: formatStatus(response.data.status),
      cost: response.data.cost,
      startTime: response.data.startDate + " " + response.data.startHms,
      endTime: response.data.endDate + " " + response.data.endHms,
      remark: response.data.remark,
    })
  }

  //获取数据总数
  async getNum() {
    const response = await reqGetAproNum(memoryUtils.user.id);
    console.log(response.count);
    this.setState({
      num: response.count,
    })
  }

  statusChange = (value) => {
    console.log(value);
    this.setState({
      myStatus: value,
    })
  }

  onSelect = (value, node) => {
    if (node.isPerson) {
      this.setState({
        departmentId: value,
        nextUsername: node.title,
        nextUserId: node.userId,
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

  remarkChange(e) {
    this.setState({
      myRemark: e.target.value
    })
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

    let obj = {
      id: -1,
      title: "无下一环",
      key: -1,
      value: -1,
      username: "",
      isPerson: true,
      isLeaf: true,
      userId: -1,
      icon: <UserOutlined />,
      pId: 0,
    }

    formatList.unshift(obj);
    this.setState({
      tree: formatList,
    })

  }

  //审批提交
  async apro(userId, flowId, status, remark, nextUser, nextName) {
    const response = await reqAproFlow(userId, flowId, status, remark, nextUser, nextName);
    console.log(response);
    
  }

  handleDo() {
    console.log(memoryUtils.user.id, this.state.theFlowId, this.state.myStatus, this.state.myRemark, this.state.nextUserId, this.state.nextUsername);
    this.apro(memoryUtils.user.id, this.state.theFlowId, this.state.myStatus, this.state.myRemark, this.state.nextUserId, this.state.nextUsername)
    this.setState({
      SPvisible: false,
    })
  }

  componentDidMount() {
    this.getNum();
    this.getDataSource(1, 5);
    this.getDepartmentList();
  }

  render() {

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
        width: 80,
      },
      {
        title: '流程名',
        dataIndex: 'title',
        key: 'title',
        fixed: 'left',
        width: 100,
      },
      {
        title: '发起人',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '开始时间',
        dataIndex: 'startDate',
        key: 'startDate',
      },
      {
        title: '预计结束时间',
        dataIndex: 'endDate',
        key: 'endDate',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '操作',
        dataIndex: 'run',
        key: 'run',
        fixed: 'right',
        width: 150,
        render: (text, record) =>
          <div className="run-container">

            <Button type="primary" onClick={() => this.handleMore(record)} size={"small"} style={{ margin: "0 5px" }}>查看</Button>
            <Button type="primary" onClick={() => this.handleSP(record)} size={"small"} style={{ margin: "0 5px" }}>审批</Button>
          </div>
        ,
      }
    ];
    return (
      <div className='flow-apro'>
        <Modal
          title="审批流程"
          width="800px"
          visible={this.state.SPvisible}
          onOk={this.SPhandleOk}
          onCancel={this.SPhandleCancel}
        >
          <Card>
            <Descriptions
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="是否通过">
                <Select onChange={(value) => this.statusChange(value)} defaultValue={1} style={{ marginLeft: '28px', width: 120 }}>
                  <Option value={1}>同意</Option>
                  <Option value={2}>退回</Option>
                </Select>
              </Descriptions.Item>
              <Descriptions.Item label="递交给">
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
            <div className="more" style={{ display: "flex" }}>
              <div className="more-label">流程备注:</div>
              <TextArea onChange={(e) => this.remarkChange(e)} autoSize={{ minRows: 4, maxRows: 8 }} style={{ marginLeft: '38px', width: 400 }} />
            </div>
            <div className="bt-container" style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Button type="primary" onClick={() => this.handleDo()} style={{ marginTop: "25px" }}>提交</Button>
            </div>

          </Card>
        </Modal>

        <Modal
          title="流程详情信息"
          width="800px"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Card>
            <Descriptions
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="任务标题">{this.state.title}</Descriptions.Item>
              <Descriptions.Item label="流程编码">{this.state.id}</Descriptions.Item>
              <Descriptions.Item label="发起人">{this.state.userName}</Descriptions.Item>
              <Descriptions.Item label="流程类型">{this.state.type}</Descriptions.Item>
              <Descriptions.Item label="流程状态">{this.state.status}</Descriptions.Item>
              <Descriptions.Item label="预算">{this.state.cost} ¥</Descriptions.Item>
              <Descriptions.Item label="开始时间">{this.state.startTime}</Descriptions.Item>
              <Descriptions.Item label="预计结束时间">{this.state.endTime}</Descriptions.Item>
              <Descriptions.Item label="流程备注">
                {this.state.remark}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <div style={{ height: "10px" }}></div>
          <Card style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            <Collapse>
              <Panel header="流程表" key="1">
                <Timeline>
                  {this.state.flow}
                </Timeline>
              </Panel>
            </Collapse>
          </Card>
        </Modal>
        <Card title="待审批流程" >
          <Table
            dataSource={this.state.dataSource}
            columns={columns}
            rowKey={record => record}
            pagination={this.state.pagination}
            bordered={true}
            onChange={this.onchange}
            loading={this.state.loading}
          />
        </Card>
      </div>
    );
  }
}