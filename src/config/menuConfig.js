/**
 * @author qyy
 * @description 菜单配置
 */


const menuList = [
  {
    title: "签到",
    key: 1,
    type: 1,
    parentId: 0,
  },
  {
    title: "个人信息", //标题
    key: 2, //对应path
    type: 1,
    parentId: 0,
  },
  {
    title: "工作流",
    key: 3,
    type: 0,
    parentId: 0,
    children: [
      {
        title: "请假申请",
        key: 4,
        type: 1,
        parentId: 3,
      },
      {
        title: "流程申请",
        key: 5,
        type: 1,
        parentId: 3,
      },
      {
        title: "我的流程",
        key: 6,
        type: 1,
        parentId: 3,
      },
      {
        title: "我的审批",
        key: 7,
        type: 1,
        parentId: 3,
      },
      {
        title: "全部流程",
        key: 8,
        type: 1,
        parentId: 3,
      },
    ],
  },
  {
    title: "人员通讯",
    key: 9,
    type: 1,
    parentId: 0,
  },
  {
    title: "管理",
    key: 10,
    type: 0,
    parentId: 0,
    children: [
      {
        title: "权限管理",
        key: 11,
        type: 1,
        parentId: 10,
      },
      {
        title: "发布通知",
        key: 12,
        type: 1,
        parentId: 10,
      },
      {
        title: "添加新员工",
        key: 13,
        type: 1,
        parentId: 10,
      },
      {
        title: "注销员工账号",
        key: 14,
        type: 1,
        parentId: 10,
      },

    ],
  },
  
  {
    title: "通知",
    key: 15,
    type: 1,
    parentId: 0,
  },
];

export default menuList;
