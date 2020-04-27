import React from 'react';
import { Card, Table, Button, Modal } from 'antd';
import { getFlow } from '../../../../mock/loginMock';
import { reqFlowList } from '../../../../api/link';
import './flow-all.less';

export default class FlowAll extends React.Component {
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
        width: 150,
        render: (text, record) =>
          <div className="run-container">

            <Button type="primary" onClick={() => this.handleMore(record)} size={"small"} style={{ margin: "0 5px" }}>查看</Button>
            <Button type="primary" size={"small"} style={{ margin: "0 5px" }}>删除</Button>
          </div>
        ,
      }
    ];
    return (
      <div className='flow-all'>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Card title="全部流程列表" >
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