/**
 * @author qyy
 * @description 菜单配置
 */

const menuList = [
  {
    title: "签到",
    key: "/sign",
    icon: "8",
  },
  {
    title: "个人信息", //标题
    key: "/myhome", //对应path
    icon: "3", //图标
  },
  {
    title: "工作流",
    key: "/work",
    icon: "1",
    children: [
      {
        title: "请假申请",
        key: "/leave",
        icon: "4",
      },
      {
        title: "流程申请",
        key: "/flowapply",
        icon: "5",
      },
      {
        title: "我的流程",
        key: "/myflow",
        icon: "0",
      },
      {
        title: "我的审批",
        key: "/flowapro",
        icon: "6",
      },
      {
        title: "全部流程",
        key: "/flowall",
        icon: "7",
      },
    ],
  },
  {
    title: "人员通讯",
    key: "/person",
    icon: "0",
  },
  {
    title: "管理",
    key: "/per",
    icon: "9",
    children: [
      {
        title: "权限管理",
        key: "/power",
        icon: "10",
      },
      {
        title: "发布通知",
        key: "/push-notice",
        icon: "11",
      },
      {
        title: "添加新员工",
        key: "/new-user",
        icon: "12",
      },
      {
        title: "注销员工账号",
        key: "/cancel-user",
        icon: "13",
      },

    ],
  },
  
  {
    title: "通知",
    key: "/notice",
    icon: "2",
  },
];

export default menuList;
