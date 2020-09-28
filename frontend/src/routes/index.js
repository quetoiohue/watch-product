import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PublicLayout from '../layouts/public'
import AuthLayout from '../layouts/auth'
import { httpGet } from '../helpers/http'
import { loadUser } from '../reducers/actions/user'

import routes from './routes'

const AppRoute = () => {
  return (
    <Switch>
      {routes.map(
        ({ path, component: Component, isPrivate, isExact }, index) => {
          return isPrivate ? (
            <Route exact={isExact} path={path} key={`${path}-${index}`}>
              <AuthLayout>
                <Component />
              </AuthLayout>
            </Route>
          ) : (
            <Route exact={isExact} path={path} key={`${path}-${index}`}>
              <PublicLayout>
                <Component />
              </PublicLayout>
            </Route>
          )
        }
      )}
    </Switch>
  )
}

export default AppRoute
