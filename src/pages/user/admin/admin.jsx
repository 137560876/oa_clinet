import React from 'react'
import memoryUtils from '../../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';

/**
 * @description: 管理组件
 */

export default class Admin extends React.Component {

  render() {
    //内存没有存user
    const user = memoryUtils.user;
    if (!user || !user.id) {
      // 自动跳转到登录
      return <Redirect to='/login' />
    }
    return (
    <div>Admin {user.name}</div>
    );
  }
}
