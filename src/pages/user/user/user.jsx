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
import Flow from '../../inner-page/flow/flow';
import SignIn from '../../inner-page/sign-in/sign-in';
import Person from '../../inner-page/person/person';

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
                  <Route path='/flow' component={Flow}></Route>
                  <Route Path='/person' component={Person}></Route>
                  <Redirect to='/myhome'></Redirect>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}
