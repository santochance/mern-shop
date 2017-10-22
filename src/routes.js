import {
  Playground,
  Home,
  Signin,
  Signup,
  Login,
  ProductDetails,
  Signup2,
  TestCart,
  ProductShow,
  ConfirmOrder,
  UserCenter,
  OrderHistory,
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
  },
  {
    path: '/signup2',
    component: Signup2,
  },

  {
    path: '/test-cart',
    component: TestCart,
  },
  {
    path: '/product-show',
    component: ProductShow,
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
  },
  {
    path: '/order-history',
    component: OrderHistory,
  },
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

  // {
  //   path: '/search',
  //   component: Search,
  // },
  // {
  //   path: '/search-result',
  //   component: SearchResult,
  // },
  // {
  //   path: '/cart',
  //   component: Cart,
  // },
  // {
  //   path: '/test-checkbox',
  //   component: TestCheckbox,
  // },
  // {
  //   path: '/test-auto-make-fold',
  //   component: TestAutoMakeFold,
  // },
]

export default routes
export * from './all-index'
