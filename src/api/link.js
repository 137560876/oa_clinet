/**
 * @author qyy 
 * @description 所有请求
 */
import ajax from './ajax'

export const reqlogin = (username, password) => ajax('/login', {username, password}, 'POST'); 