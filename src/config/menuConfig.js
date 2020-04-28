/**
 * @author qyy
 * @description 菜单配置
 */

const menuList = [
  {
    title: "首页", //标题
    key: "/myhome", //对应path
    icon: "2", //图标
  },
  {
    title: "工作流",
    key: "/work",
    icon: "1",
    children: [
      {
        title: "流程申请",
        key: "/flowapply",
        icon: "1",
      },
      {
        title: "我的流程",
        key: "/myflow",
        icon: "1",
      },
      {
        title: "我的审批",
        key: "/flowapro",
        icon: "1",
      },
      {
        title: "全部流程",
        key: "/flowall",
        icon: "1",
      },
    ],
  },
  {
    title: "签到",
    key: "/sign",
    icon: "2",
  },
  {
    title: "人员",
    key: "/person",
    icon: "0",
  },
  {
    title: "权限",
    key: "/power",
    icon: "1",
  },
  {
    title: "通知",
    key: "/notice",
    icon: "2",
  },
];

export default menuList;
