import HomePage from '../pages'
import Detail from '../pages/Detail'
import Landing from '../pages/Landing'

export default [
  {
    path: '/landing',
    component: Landing,
    isPrivate: false,
    isExact: false,
  },
  // Authenticated Route
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
]
