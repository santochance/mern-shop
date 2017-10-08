/* eslint no-unused-vars: 0 */

import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import './SiteNav.css'

// let localAuth = window.auth || {isAuthed: false}

// function signOut(history) {
//   console.log('going to signout')
//   fetch('/signout').then(res => {
//     if (res.ok) {
//       console.log('sign out successfully')
//       window.auth = {isAuthed: false}
//       console.log(history)
//     }
//   }).catch(console.error)
// }

function handleClick(e) {
  console.log('Clicked: %s', e && e.currentTarget || 'no args')
}

const SiteNav = withRouter(({ history }) => {
  function signout() {
    console.log('going to signout')
    fetch('/signout').then(res => {
      if (res.ok) {
        console.log('sign out successfully')
        window.auth = {isAuthed: false}
        setTimeout(() => history.push('/'), 0)
      }
    }).catch(console.error)
  }

  const auth = window.auth || {isAuthed: false}

  console.log('SiteNav detected route has changed, isAuthed is %s', auth.isAuthed)

  // 获取认证对象
  return (
    auth.isAuthed ? (
      <div className="site-nav">
        <span>
          <img width="30" height="30" src="" alt="Avarta"/><span>{auth.username}</span>
        </span>
        <Link to="/login" onClick={handleClick({})} className="btn btn-info">Sign out</Link>
      </div>
    ) : (
      <div className="site-nav">
        <span>You are not logged in. Please log in or sign up.</span>
        <Link to="/signin" className="btn btn-primary">Sign in</Link>
        <Link to="/signup" className="btn btn-success">Sign up</Link>
      </div>
    )
  )
})

export default SiteNav
