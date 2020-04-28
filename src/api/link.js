/**
 * @author qyy 
 * @description api
 */
import ajax from './ajax'

export const reqlogin = (username, password) => ajax('/login', {username, password}, 'POST'); 

export const reqPower = () => ajax('/getqx', {}, 'Get'); 

export const reqFlowList = () => ajax('/getflow', {}, 'Get'); 

export const reqNotice = () => ajax('/getNotice', {}, 'Get');

export const reqWeather = () => {
    return ajax(
        'https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=60d8d22524cb4b3d89271d1584ba5cb7',
        {},
        'Get'
        );
}