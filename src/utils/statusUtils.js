/**
 * @author qyy
 * @description 处理状态信息
 */

export const formatStatus = (status) => {
  var sta = "空闲";
  switch (status) {
    case 1:
      sta = "空闲";
      break;
    case 2:
      sta = "繁忙";
      break;
    case 3:
      sta = "出差";
      break;
    default:
      sta = "空闲";
      break;
  }

  return sta;
};
