import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import AuthLayout from '../layouts/auth'
import PublicLayout from '../layouts/public'
import { appendNotifications } from '../reducers/actions/notification'
import routes from './routes'
import singlePusher from '../services/pusher'

const AppRoute = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    function messageEventHandler(data) {
      dispatch(appendNotifications(data.notification))
    }

    const pusher = singlePusher.getInstance()
    let channel = pusher.subscribe('trigger-price')
    channel.bind('trigger-event', messageEventHandler)

    return () => {
      channel.unbind()
      pusher.unsubscribe(channel)
      pusher.disconnect()
    }
  }, [dispatch])
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
