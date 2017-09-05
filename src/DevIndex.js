import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './DevIndex.css'

import Home from './Home.js'
import Signup from './Signup.js'
import Signin from './Signin.js'
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

let views = [
  Home,
  ProductNew,
  TestCart,
  CreateProduct,
  Signup,
  Signin,
  Search,
  SearchResult,
  DataGrid,
  ItemList,
  Cart,
  ConfirmOrder,
  TestCheckbox,
  TestRoutes,
  TestAutoMakeFold,
]
// console.log(views)
// debugger

// const DevIndex = () => (
//   <Router>
//     <div>
//       <ul className="route-nav">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/signup">Signup</Link></li>
//         <li><Link to="/signin">Signin</Link></li>
//         <li><Link to="/cart">Cart</Link></li>
//         <li><Link to="/testroutes">TestRoutes</Link></li>
//       </ul>

//       <Route exact path="/" component={Home}/>
//       <Route path="/signup" component={Signup}/>
//       <Route path="/signin" component={Signin}/>
//       <Route path="/cart" component={Cart}/>
//     </div>
//   </Router>
// )

const DevIndex = () => (
  <div>
    <ul className="route-nav">
      {views.map(view => (
        <li key={view.name}><Link to={`/${view.name.toLowerCase()}`}>{view.name}</Link></li>
      ))}
    </ul>
    {/*
    <Route exact path="/"
        component={Home}/>
    {views.map(view => (
      <Route key={view.name} path={`/${view.name.toLowerCase()}`} component={view}/>
      )
    )}
    */}
  </div>
)

export default DevIndex
