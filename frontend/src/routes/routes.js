import HomePage from '../pages'
import Landing from '../pages/Landing'

export default [
  {
    path: '/landing',
    component: Landing,
    isPrivate: false,
    isExact: false,
  },
  {
    path: '/',
    component: HomePage,
    isPrivate: true,
    isExact: true,
  },
]
