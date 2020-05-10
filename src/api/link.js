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
  message
) =>
  ajax(
    "/exp/user/add",
    { username, password, name, phone, email, address, sex, message },
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

export const reqNotice = (id) => ajax("/exp/notice/getNoticeDetail", { id }, "GET");

export const reqPower = () => ajax("/getqx", {}, "Get");

export const reqFlowList = () => ajax("/getflow", {}, "Get");

export const reqWeather = () => {
  return ajax(
    "https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=60d8d22524cb4b3d89271d1584ba5cb7",
    {},
    "Get"
  );
};
