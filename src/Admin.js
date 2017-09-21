import React from 'react'
// import {
//   Navbar,
//   Nav,
//   NavItem,
//   NavDropdown,
//   MenuItem,
// } from 'react-bootstrap'

// import './Admin.css'
import './sass/main.css'

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="admin">
        <Sidebar />
        <Navbar />
      </div>
    )
  }
}

var Sidebar = React.createClass({
  render: function() {
    return (

      <aside className="main-sidebar hidden-print">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image"><img className="img-circle" src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg" alt="User Image" /></div>
            <div className="pull-left info">
              <p>John Doe</p>
              <p className="designation">Frontend Developer</p>
            </div>
          </div>
          {/* Sidebar Menu*/}
          <ul className="sidebar-menu">
            <li className="active"><a href="index.html"><i className="fa fa-dashboard" /><span>Dashboard</span></a></li>
            <li className="treeview"><a href="#"><i className="fa fa-laptop" /><span>UI Elements</span><i className="fa fa-angle-right" /></a>
              <ul className="treeview-menu">
                <li><a href="bootstrap-components.html"><i className="fa fa-circle-o" /> Bootstrap Elements</a></li>
                <li><a href="http://fontawesome.io/icons/" target="_blank"><i className="fa fa-circle-o" /> Font Icons</a></li>
                <li><a href="ui-cards.html"><i className="fa fa-circle-o" /> Cards</a></li>
                <li><a href="widgets.html"><i className="fa fa-circle-o" /> Widgets</a></li>
              </ul>
            </li>
            <li><a href="charts.html"><i className="fa fa-pie-chart" /><span>Charts</span></a></li>
            <li className="treeview"><a href="#"><i className="fa fa-edit" /><span>Forms</span><i className="fa fa-angle-right" /></a>
              <ul className="treeview-menu">
                <li><a href="form-components.html"><i className="fa fa-circle-o" /> Form Components</a></li>
                <li><a href="form-custom.html"><i className="fa fa-circle-o" /> Custom Components</a></li>
                <li><a href="form-samples.html"><i className="fa fa-circle-o" /> Form Samples</a></li>
                <li><a href="form-notifications.html"><i className="fa fa-circle-o" /> Form Notifications</a></li>
              </ul>
            </li>
            <li className="treeview"><a href="#"><i className="fa fa-th-list" /><span>Tables</span><i className="fa fa-angle-right" /></a>
              <ul className="treeview-menu">
                <li><a href="table-basic.html"><i className="fa fa-circle-o" /> Basic Tables</a></li>
                <li><a href="table-data-table.html"><i className="fa fa-circle-o" /> Data Tables</a></li>
              </ul>
            </li>
            <li className="treeview"><a href="#"><i className="fa fa-file-text" /><span>Pages</span><i className="fa fa-angle-right" /></a>
              <ul className="treeview-menu">
                <li><a href="blank-page.html"><i className="fa fa-circle-o" /> Blank Page</a></li>
                <li><a href="page-login.html"><i className="fa fa-circle-o" /> Login Page</a></li>
                <li><a href="page-lockscreen.html"><i className="fa fa-circle-o" /> Lockscreen Page</a></li>
                <li><a href="page-user.html"><i className="fa fa-circle-o" /> User Page</a></li>
                <li><a href="page-invoice.html"><i className="fa fa-circle-o" /> Invoice Page</a></li>
                <li><a href="page-calendar.html"><i className="fa fa-circle-o" /> Calendar Page</a></li>
                <li><a href="page-mailbox.html"><i className="fa fa-circle-o" /> Mailbox</a></li>
                <li><a href="page-error.html"><i className="fa fa-circle-o" /> Error Page</a></li>
              </ul>
            </li>
            <li className="treeview"><a href="#"><i className="fa fa-share" /><span>Multilevel Menu</span><i className="fa fa-angle-right" /></a>
              <ul className="treeview-menu">
                <li><a href="blank-page.html"><i className="fa fa-circle-o" /> Level One</a></li>
                <li className="treeview"><a href="#"><i className="fa fa-circle-o" /><span> Level One</span><i className="fa fa-angle-right" /></a>
                  <ul className="treeview-menu">
                    <li><a href="blank-page.html"><i className="fa fa-circle-o" /> Level Two</a></li>
                    <li><a href="#"><i className="fa fa-circle-o" /><span> Level Two</span></a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
});

var Navbar = React.createClass({
  render: function() {
    return (
      <header className="main-header hidden-print"><a className="logo" href="index.html">Vali</a>
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}<a className="sidebar-toggle" href="#" data-toggle="offcanvas" />
          {/* Navbar Right Menu*/}
          <div className="navbar-custom-menu">
            <ul className="top-nav">
              {/*Notification Menu*/}
              <li className="dropdown notification-menu"><a className="dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-bell-o fa-lg" /></a>
                <ul className="dropdown-menu">
                  <li className="not-head">You have 4 new notifications.</li>
                  <li><a className="media" href="javascript:;"><span className="media-left media-icon"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-primary" /><i className="fa fa-envelope fa-stack-1x fa-inverse" /></span></span>
                      <div className="media-body"><span className="block">Lisa sent you a mail</span><span className="text-muted block">2min ago</span></div></a></li>
                  <li><a className="media" href="javascript:;"><span className="media-left media-icon"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-danger" /><i className="fa fa-hdd-o fa-stack-1x fa-inverse" /></span></span>
                      <div className="media-body"><span className="block">Server Not Working</span><span className="text-muted block">2min ago</span></div></a></li>
                  <li><a className="media" href="javascript:;"><span className="media-left media-icon"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-success" /><i className="fa fa-money fa-stack-1x fa-inverse" /></span></span>
                      <div className="media-body"><span className="block">Transaction xyz complete</span><span className="text-muted block">2min ago</span></div></a></li>
                  <li className="not-footer"><a href="#">See all notifications.</a></li>
                </ul>
              </li>
              {/* User Menu*/}
              <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user fa-lg" /></a>
                <ul className="dropdown-menu settings-menu">
                  <li><a href="page-user.html"><i className="fa fa-cog fa-lg" /> Settings</a></li>
                  <li><a href="page-user.html"><i className="fa fa-user fa-lg" /> Profile</a></li>
                  <li><a href="page-login.html"><i className="fa fa-sign-out fa-lg" /> Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
});

export default Admin
