import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import routes from './routes.js'

import { Menu, Icon, Affix } from 'antd';
import './UserCenter.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class UserCenter extends React.Component {
  state = {}

  render() {
    const { match } = this.props
    console.log('match', match)
    return (
      <div className="user-center wrapper flex-r-full">
        <div className="slide" style={{ width: 200, float: 'left' }}>
          <Affix>
            <div className="user-panel">
              <img className="avatar" src={require('./avatar.jpg')} alt=""/>
              <span className="username">Vincent</span>
            </div>
            <Sider match={match} />
          </Affix>
        </div>
        <div className="main" style={{ float: 'left' }}>
          {routes.map((route, idx) => (
            <Route
              key={idx}
              path={match.url + route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </div>
      </div>
    )
  }
}

class Sider extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  }
  render() {
    const { match } = this.props

    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1">
          <Link to={`${match.url}/`}>
            <Icon type="gift" />
            <span>我的订单</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={`${match.url}/favorites`}>
            <Icon type="star-o" />
            <span>我的收藏夹</span>
          </Link>
        </Menu.Item>
        <SubMenu key="sub1" title={<span><Icon type="user" /><span>用户管理</span></span>}>
          <Menu.Item key="3">
            <Link to={`${match.url}/addresses`}>收货地址</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={`${match.url}/modify-profile`}>修改资料</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={`${match.url}/modify-password`}>修改密码</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default UserCenter
