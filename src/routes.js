import {
  Playground,
  Home,
  Signin,
  Signup,
  Login,
  ProductDetails,
  Signup2,
  ProductShow,
  ConfirmOrder,
  UserCenter,
  OrderHistory,
  CartDetails,
  PayPrompt,
  PayCompleted,
  // TestCart
  // CreateProduct,
  // DataGrid,
  // ItemList,
  // ProductNew,
  // EditUserForm,
  // ProductShowcase,
  // CartSummary,
  // UserAdmin,
  // Admin,
  // UserCrud,
  // ProductList,
} from './all-index'

import React from 'react'
import { Link } from 'react-router-dom'

const routes = [
  {
    path: '/dev/playground',
    component: Playground,
    label: 'Playground',
  },
  {
    path: '/',
    component: Home,
    exact: true,
    label: 'Home',
    hidden: true,
  },
  {
    path: '/signin',
    component: Signin,
    hidden: true,
  },
  {
    path: '/signup_0',
    component: Signup2,
    hidden: true,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/product-details',
    component: ProductDetails,
    hidden: true,
  },
  {
    path: '/product-show',
    component: ProductShow,
    hidden: true,
  },
  {
    path: '/cart-details',
    component: CartDetails,
    hidden: true,
  },
  {
    path: '/confirm-order',
    component: ConfirmOrder,
    hidden: true,
  },
  {
    path: '/user-center',
    component: UserCenter,
    hidden: true,
  },
  {
    path: '/order-history',
    component: OrderHistory,
  },
  {
    path: '/pay-prompt',
    component: PayPrompt,
    hidden: true,
  },
  {
    path: '/pay-completed',
    component: PayCompleted,
  }
  // {
  //   path: '/create-product',
  //   component: CreateProduct,
  // },
  // {
  //   path: '/data-grid',
  //   component: DataGrid,
  // },
  // {
  //   path: '/item-list',
  //   component: ItemList,
  // },
  // {
  //   path: '/product-new',
  //   component: ProductNew,
  // },

  // {
  //   path: '/product-list',
  //   component: ProductList,
  // },
  // {
  //   path: '/edit-user-form',
  //   component: EditUserForm,
  // },
  // {
  //   path: '/product-showcase',
  //   component: ProductShowcase,
  // },

  // {
  //   path: '/cart-summary',
  //   component: CartSummary,
  // },
  // {
  //   path: '/admin',
  //   component: Admin,
  // },
  // {
  //   path: '/user-crud',
  //   component: UserCrud,
  // },
  // {
  //   path: '/user-admin',
  //   component: UserAdmin,
  // },
]

export default routes
export * from './all-index'
