/**
 * @author qyy
 * @description 处理状态信息
 */

export const colorStatus = (status) => {
  var sta = "green";
  switch (status) {
    case 0:
      sta = "gray";
      break;
    case 1:
      sta = "green";
      break;
    case 2:
      sta = "red";
      break;
    case 3:
      sta = "blue";
      break;
    default:
      sta = "green";
      break;
  }

  return sta;
};
