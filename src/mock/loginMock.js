var Mock = require("mockjs");

export function test() {
  Mock.mock("/login", function (options) {
    return {
      name: "qingyy",
      id: 1,
      user: 1,
      password: 2,
      statu: 200,
    };
  });
}

//模拟获取权限

export function power() {
  Mock.mock("/getqx", {
      powerList: ['0-0-0-0', '0-0-0-2', '0-1-0-2'],
    })
}
