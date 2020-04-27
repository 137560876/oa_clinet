import React from 'react';
import { Card, Table, Button, Modal, Descriptions, Timeline } from 'antd';
import { getFlow } from '../../../../mock/loginMock';
import { reqFlowList } from '../../../../api/link';
import TimeDiv from '../../../../components/time-line-div/time-line-div';
import './flow-apro.less';


export default class FlowApro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false
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
  async getDataSource() {
    getFlow();
    let response = await reqFlowList();
    this.setState({
      dataSource: response.data,
    })
  }

  //点击查看详情时间
  handleMore = (record) => {
    console.log(record.id);
    //通过id查找到相应的流程详情，弹窗显示
    this.setState({
      visible: true,
    })


  }

  componentDidMount() {
    this.getDataSource();
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
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 100,
      },
      {
        title: '发起人',
        dataIndex: 'applyName',
        key: 'applyName',
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
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
        width: 80,
        render: (text, record) =>
          <div className="run-container">
            <Button type="primary" onClick={() => this.handleMore(record)} size={"small"} style={{ margin: "0 5px" }}>审批</Button>
          </div>
        ,
      }
    ];
    return (
      <div className='flow-apro'>
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
              <Descriptions.Item label="任务标题">申请</Descriptions.Item>
              <Descriptions.Item label="流程编码">i1234</Descriptions.Item>
              <Descriptions.Item label="发起人">阿秀</Descriptions.Item>
              <Descriptions.Item label="流程类型">请假</Descriptions.Item>
              <Descriptions.Item label="流程状态">结束</Descriptions.Item>
              <Descriptions.Item label="所属部门">测试平台开发部</Descriptions.Item>
              <Descriptions.Item label="开始时间">2020-4-15 18:30</Descriptions.Item>
              <Descriptions.Item label="更新时间">2020-4-16 19:40</Descriptions.Item>
              <Descriptions.Item label="流程备注">
                因要回家一趟申请请假14年
                </Descriptions.Item>
            </Descriptions>

          </Card>
          <div style={{ height: "10px" }}></div>
          <Card style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            <Timeline>
              <Timeline.Item color="green">
                <TimeDiv
                  view={"发起"}
                  person={"阿秀"}
                  type={"移动应用开发部主管"}
                  time={"2020-4-1 16:30"}
                />
              </Timeline.Item>
              <Timeline.Item color="green">
                <TimeDiv
                  view={"同意，加油"}
                  person={"小青"}
                  type={"移动应用开发部主管"}
                  time={"2020-4-1 16:30"}
                />
              </Timeline.Item>
              <Timeline.Item color="red">
                <TimeDiv
                  view={"退回，假种信息不正确"}
                  person={"阿秀"}
                  type={"部门经理"}
                  time={"2020-4-1 16:30"}
                />
              </Timeline.Item>
            </Timeline>
          </Card>
        </Modal>
        <Card title="待审批流程" >
          <Table
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
            bordered={true}
          />
        </Card>
      </div>
    );
  }
}