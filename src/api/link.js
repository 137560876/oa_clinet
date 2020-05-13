/**
 * @author qyy
 * @description api
 */
import ajax from "./ajax";

//login
export const reqlogin = (username, password) =>
  ajax("/exp/user/login", { username, password }, "POST");

//add new user
export const reqAddNewUser = (
  username,
  password,
  name,
  phone,
  email,
  address,
  sex,
  message,
  departmentId
) =>
  ajax(
    "/exp/user/add",
    {
      username,
      password,
      name,
      phone,
      email,
      address,
      sex,
      message,
      departmentId,
    },
    "POST"
  );

//get sign list
export const reqGetSignList = (userId) =>
  ajax("/exp/sign/getSignList", { userId }, "GET");

//up sign
export const reqUpSign = (userId) =>
  ajax("/exp/sign/daySign", { userId }, "POST");

//out sign
export const reqOutSign = (userId) =>
  ajax("/exp/sign/leaveSign", { userId }, "POST");

//get departmentList
export const reqGetDepartmentList = () =>
  ajax("/exp/department/getDepartmentList", {}, "GET");

//get Notice
export const reqGetNotice = (userId) =>
  ajax("/exp/notice/getNoticeById", { userId }, "GET");

//notice readed
export const reqReadNotice = (userId, noticeId) =>
  ajax("/exp/notice/read", { userId, noticeId }, "POST");

//get deparmentList by department id
export const reqGetUserListByDepartmentId = (id) =>
  ajax("/exp/department/getUserListByDepartmentId", { id }, "GET");

//change infromation
export const reqChangeInformation = (
  id,
  phone,
  email,
  address,
  status,
  message
) =>
  ajax(
    "/exp/user/edit",
    { id, phone, email, address, status, message },
    "POST"
  );

//change password
export const reqChangePassowrd = (username, password) =>
  ajax("/exp/user/edit", { username, password }, "POST");

//publish notice
export const reqPublishNotice = (userId, title, context, level) =>
  ajax("/exp/notice/addNotice", { userId, title, context, level }, "POST");

export const reqFindUser = (username) =>
  ajax("/exp/user/getUserByUsername", { username }, "GET");

//delete user
export const reqdeleteUser = (username) =>
  ajax("/exp/user/delete", { username }, "POST");

export const reqNotice = (id) =>
  ajax("/exp/notice/getNoticeDetail", { id }, "GET");

export const reqGetPermission = (userId) =>
  ajax("/exp/permission/getPermissionByUserId", { userId }, "GET");

export const reqChangePower = (id, list) =>
  ajax("/exp/permission/updatePermission", { id, list }, "POST");

export const reqGetAllFlow = (startPosition, limit) =>
  ajax("/exp/flow/getAllFlowList", { startPosition, limit }, "GET");

export const reqGetAllNum = () => ajax("/exp/flow/getAllNum", {}, "GET");

export const reqGetMyFlow = (startPosition, limit, userId) =>
  ajax("/exp/flow/getListByUserId", { startPosition, limit, userId }, "GET");

export const reqGetMyNum = (id) => ajax("/exp/flow/getMyNum", { id }, "GET");

export const reqGetAproFlow = (startPosition, limit, userId) =>
  ajax("/exp/flow/getAproFlowList", { startPosition, limit, userId }, "GET");

export const reqGetAproNum = (id) =>
  ajax("/exp/flow/getAproNum", { id }, "GET");

export const reqFindFlowById = (id) =>
  ajax("/exp/flow/findFlowById", { id }, "GET");

export const reqGetFlowMain = (id) =>
  ajax("/exp/flow/getFlowMain", { id }, "GET");

export const reqAddFlow = (
  title,
  userId,
  userName,
  nextUserId,
  nextUsername,
  startHms,
  startDate,
  endDate,
  endHms,
  cost,
  type,
  status,
  remark
) =>
  ajax(
    "/exp/flow/addFlow",
    {
      title,
      userId,
      userName,
      nextUserId,
      nextUsername,
      startHms,
      startDate,
      endDate,
      endHms,
      cost,
      type,
      status,
      remark,
    },
    "POST"
  );

export const reqStopFlow = (userId, id) =>
  ajax("/exp/flow/stop", { userId, id }, "POST");

//apro
export const reqAproFlow = (
  userId,
  flowId,
  status,
  remark,
  nextUser,
  nextName
) =>
  ajax(
    "/exp/flow/apro",
    { userId, flowId, status, remark, nextUser, nextName },
    "POST"
  );

export const reqGetTrueNum = (id) => ajax("/exp/sign/trueNum", { id }, "GET");

export const reqGetErrorNum = (id) => ajax("/exp/sign/errorNum", { id }, "GET");

export const reqGetLeaveNum = (id) => ajax("/exp/sign/leaveNum", { id }, "GET");

export const reqPower = () => ajax("/getqx", {}, "Get");

export const reqFlowList = () => ajax("/getflow", {}, "Get");

export const reqWeather = () => {
  return ajax(
    "https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=60d8d22524cb4b3d89271d1584ba5cb7",
    {},
    "Get"
  );
};
