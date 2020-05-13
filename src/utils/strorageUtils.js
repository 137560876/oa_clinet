/**
 * @author qyy
 * @description 实现维持登录的功能
 */
import store from 'store';
const USER_KEY = 'user_key';
const POWER_KEY = 'power_key';

export default {
  //保存user
  saveUser(user) {
    store.set(USER_KEY, user);
  },

  //读取user
  getUser() {
    return store.get(USER_KEY) || {};
  },

  //移除user
  removeUser() {
    store.remove(USER_KEY);
  },

  savePower(power) {
    store.set(POWER_KEY, power);
  },

  //读取user
  getPower() {
    return store.get(POWER_KEY) || [];
  },

  //移除user
  removePower() {
    store.remove(POWER_KEY);
  }
}
