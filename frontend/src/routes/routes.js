import HomePage from '../pages'
import Checkout from '../pages/Checkout'
import Detail from '../pages/Detail'
import Landing from '../pages/Landing'
import ProductAlerts from '../pages/ProductAlerts'

export default [
  // Unauthenticated Routes
  {
    path: '/landing',
    component: Landing,
    isPrivate: false,
    isExact: false,
  },

  // Authenticated Routes
  {
    path: '/',
    component: HomePage,
    isPrivate: true,
    isExact: true,
  },
  {
    path: '/products/:productId',
    component: Detail,
    isPrivate: true,
    isExact: true,
  },
  {
    path: '/products/:productId/alerts',
    component: ProductAlerts,
    isPrivate: true,
    isExact: true,
  },
  {
    path: '/checkout',
    component: Checkout,
    isPrivate: true,
    isExact: true,
  },
]
