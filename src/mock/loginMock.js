var Mock = require("mockjs");

export function test() {
  Mock.mock("/login", function (options) {
    return {
      name: "qingyy",
      id: 1,
      user: 1,
      password: 2,
      statu: 200,
      icon: 'http://47.97.202.111:8081/img/tx.png',
    };
  });
}

//模拟获取权限

export function power() {
  Mock.mock("/getqx", {
      powerList: [1, 2, 3],
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

//获取通知详情

export function getNotice() {
  Mock.mock("/getNotice", {
    data: {
      title: '接口来的标题',
      time: '2020-1-1 20:10',
      context: '<p>我最喜欢易种好闻的花，所以外公养的桂花最对我的胃口。外公见我喜欢，给了我几颗黛紫色的桂花籽。</p>'+
      '<p>播种时正是秋季，我满心欢喜地期待它破土。哪知过了半个月还没有一点动静，渐渐地我就淡忘了。</p>'+
      '<p>过了几周我才看见几株纤弱的小苗，尖尖上还顶着种壳，像戴上了一顶不合尺寸的帽子。小芽初破土时，嫩得好像风一吹就要折断，吓得我浇花时不敢让水倾泻而下，而是小心地用喷壶一点一点喷。过了几天，小芽一点点长硬，颜色由红转绿，已经长到两个指头高了，长得可真快呀！</p>'+
      '<p>桂花一长起来便一发不可收，迅速拔高，嫩嫩的碧绿也很快过渡为棕褐色，主干有小指头那么粗，像个小伙子了</p>',
    }
  })
}