import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Home from './Home.js'
import Signin from './Sign.js'
import Search from './Search.js'
import SearchResult from './SearchResult.js'

import Cart from './Cart.js'
import TestCart from './TestCart.js'

import TestRoutes from './TestRoutes.js'

import TestCheckbox from './TestCheckbox.js'

import TestAutoMakeFold from './TestAutoMakeFold.js'
import ConfirmOrder from './ConfirmOrder.js'

import CreateProduct from './CreateProduct.js'

import DataGrid from './DataGrid.js'
import ItemList from './ItemList.js'

import ProductNew from './ProductNew.js'
import OrderHistory from './OrderHistory.js';

import Admin from './Admin.js'
import UserCrud from './UserCrud.js'
import UserAdmin from './components/UserAdmin.js'
import { Login, Signup, UserCenter, ProductList } from './components'
import EditUserForm from './components/EditUserForm.js'

const routes = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/signin',
    component: Signin,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/search-result',
    component: SearchResult,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/test-cart',
    component: TestCart,
  },
  {
    path: '/test-checkbox',
    component: TestCheckbox,
  },
  {
    path: '/test-auto-make-fold',
    component: TestAutoMakeFold,
  },
  {
    path: '/confirm-order',
    component: ConfirmOrder,
  },
  {
    path: '/create-product',
    component: CreateProduct,
  },
  {
    path: '/data-grid',
    component: DAtaGrid,
  },
  {
    path: '/item-list',
    component: ItemList,
  },
  {
    path: '/product-new',
    component: ProductNew,
  },
  {
    path: '/order-history',
    component: OrderHistory,
  },
  {
    path: '/admin',
    component: Admin,
  },
  {
    path: '/user-crud',
    component: UserCrud,
  },
  {
    path: '/user-admin',
    component: UserAdmin,
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
    path: '/user-center',
    component: UserCenter,
  },
  {
    path: '/product-list',
    component: ProductList,
  },
  {
    path: '/edit-user-form',
    component: EditUserForm,
  },
]

const DevIndex = () => (
  <div>
    <ur className="route-nav">
      {routes.map((route, idx) => (
        <li key={idx}>
          <Link to={route.path}>{_.camelCase(route.path)}</Link>
        </li>
      ))}
    </ur>
  </div>
)

export default routes
