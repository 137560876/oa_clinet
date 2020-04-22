/**
 * @author qyy
 * @description 菜单配置
 */


const menuList = [
  {
    title: '首页',//标题
    key: '/myhome', //对应path
    icon: '2', //图标
  },
  {
    title: '工作流',
    key: '/work',
    icon: '1',
    children: [ 
      {
          title: '流程',
          key: '/flow',
          icon: '1',
      }
    ]
  }
];

export default menuList;