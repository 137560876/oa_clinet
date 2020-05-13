/**
 * @author qyy
 * @description 处理状态信息
 */

export const formatStatus = (status) => {
  var sta = "正常";
  switch (status) {
    case 1:
      sta = "正常";
      break;
    case 2:
      sta = "结束";
      break;
    case 3:
      sta = "中断/撤回";
      break;
    default:
      sta = "正常";
      break;
  }

  return sta;
};
