/**
 * @author qyy 
 * @description api????
 */
import ajax from './ajax'

export const reqlogin = (username, password) => ajax('/login', {username, password}, 'POST'); 

export const reqPower = () => ajax('/getqx', {}, 'Get'); 

export const reqFlowList = () => ajax('/getflow', {}, 'Get'); 