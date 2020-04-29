/**
 * @description: 管理组件
 */

import React from 'react';
import './user.less';
import memoryUtils from '../../../utils/memoryUtils';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';

import NavLeft from '../../../components/nav-left/nav-left';
import HeaderTop from '../../../components/header/header'
import MyHome from '../../inner-page/my-home/my-home';
import Flow from '../../inner-page/flow/myflow/flow';
import FlowAll from '../../inner-page/flow/flow-all/flow-all';
import FlowApply from '../../inner-page/flow/flow-apply/flow-apply';
import FlowApro from '../../inner-page/flow/flow-apro/flow-apro';
import Leave from '../../inner-page/flow/leave/leave';

import SignIn from '../../inner-page/sign-in/sign-in';
import Person from '../../inner-page/person/person';
import Power from '../../inner-page/power/power';
import Notice from '../../inner-page/notice/notice';
import PushNotice from '../../inner-page/push-notice/push-notice';
import NewUser from '../../inner-page/new-user/new-user';
import CancelUser from '../../inner-page/cancel-user/cancel-user';

const { Content } = Layout;

export default class User extends React.Component {

  render() {
    //内存没有存user
    const user = memoryUtils.user;
    if (!user || !user.id) {
      // 自动跳转到登录
      return <Redirect to='/login' />
    }
    return (
      <div className="user">
        <Layout style={{ height: "100%" }}>
          <HeaderTop></HeaderTop>
          <Layout>
            <NavLeft></NavLeft>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280, }}>
                {/* 子路由 */}
                <Switch>
                  <Route path='/sign' component={SignIn}></Route>
                  <Route path='/myhome' component={MyHome}></Route>
                  <Route path='/myflow' component={Flow}></Route>
                  <Route path='/flowapply' component={FlowApply}></Route>
                  <Route path='/flowall' component={FlowAll}></Route>
                  <Route path='/leave' component={Leave}></Route>
                  <Route path='/flowapro' component={FlowApro}></Route>
                  <Route path='/notice' component={Notice}></Route>
                  <Route path='/push-notice' component={PushNotice}></Route>
                  <Route path='/new-user' component={NewUser}></Route>
                  <Route path='/cancel-user' component={CancelUser}></Route>
                  <Route path='/person' component={Person}></Route>
                  <Route path='/power' component={Power}></Route>
                  <Redirect to='/sign'></Redirect>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}
