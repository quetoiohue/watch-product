import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthLayout from '../layouts/auth'
import PublicLayout from '../layouts/public'
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
