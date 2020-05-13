import React from 'react';
import { Card, Table, Button, Modal, Descriptions, Timeline, Collapse } from 'antd';
import { reqGetMyFlow, reqGetMyNum, reqFindFlowById, reqGetFlowMain, reqStopFlow } from '../../../../api/link';
import TimeDiv from '../../../../components/time-line-div/time-line-div';
import { formatStatus } from '../../../../utils/FlowStatusUtils';
import { colorStatus } from '../../../../utils/greenUtils';
import memoryUtils from '../../../../utils/memoryUtils';
import './flow.less';

const { Panel } = Collapse;


export default class Flow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      pagination: {
        current: 1,
        pageSize: 5,
        total: 200,
      },
      loading: false,
      dataSource: [],
      visible: false,


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
    const response = await reqGetMyFlow((start - 1) * 5, limit, memoryUtils.user.id);
    let formatList = response.datas;
    for(let i in formatList) {
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

  //中断流程
  async stopFlow(userId, id) {
    const response = await reqStopFlow(userId, id);
    console.log(response);
    
  }

  handleDelete = (record) => {
    console.log(record.id);
    this.stopFlow(memoryUtils.user.id, record.id);
    this.getDataSource(this.state.pagination.current, this.state.pagination.pageSize);
  }

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
    const response = await reqGetMyNum(memoryUtils.user.id);
    console.log(response.count);
    this.setState({
      num: response.count,
    })
  }

  componentDidMount() {
    this.getNum();
    this.getDataSource(1, 5);
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
            <Button type="primary" onClick={() => this.handleDelete(record)} size={"small"} style={{ margin: "0 5px" }}>撤回</Button>
          </div>
        ,
      }
    ];
    return (
      <div className='flow'>
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
              <Descriptions.Item label="预算">{this.state.cost}¥</Descriptions.Item>
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
        <Card title="我的流程" >
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