import React from 'react'
// import {
//   OrderHistory,
//   Favorites,
//   ModifyPassword,
//   UserEditForm
// } from '../../components/'

const OrderHistory = (props) => {
  return (
    <div>OrderHistory</div>
  )
}
const Favorites = (props) => {
  return (
    <div>Favorites</div>
  )
}
const ModifyProfile = (props) => {
  return (
    <div>ModifyProfile</div>
  )
}
const ModifyPassword = (props) => {
  return (
    <div>ModifyPassword</div>
  )
}

const routes = [
  /* 怎样把'/'自动重写向到'order-history'? */
  {
    path: '/',
    component: OrderHistory,
    exact: true,
  },
  {
    path: '/favorites',
    component: Favorites,
  },
  {
    path: '/modify-password',
    component: ModifyPassword,
  },
  {
    path: '/modify-profile',
    component: ModifyProfile,
  },
]

export default routes
