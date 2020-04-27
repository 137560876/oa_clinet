var Mock = require("mockjs");

export function test() {
  Mock.mock("/login", function (options) {
    return {
      name: "qingyy",
      id: 1,
      user: 1,
      password: 2,
      statu: 200,
    };
  });
}

//模拟获取权限

export function power() {
  Mock.mock("/getqx", {
      powerList: ['0-0-0-0', '0-0-0-2', '0-1-0-2'],
    })
}


//模拟获取流程列表

export function getFlow() {
  Mock.mock("/getflow", {
    data: [
      {
        key: '1',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
      {
        key: '2',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },

      {
        key: '3',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
      {
        key: '4',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
      {
        key: '5',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
      {
        key: '6',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
      {
        key: '7',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
      {
        key: '8',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
      {
        key: '9',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
      {
        key: '10',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
      {
        key: '11',
        id: 'i1234',
        name: '申请',
        applyName: '阿秀',
        startTime: '2010-3-11',
        updateTime: '2020-3-11',
        status: '正常',
      },
    ]
  })
}