import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import AuthLayout from '../layouts/auth'
import PublicLayout from '../layouts/public'
import { loadNotifications } from '../reducers/actions/notification'
import singlePusher from '../services/pusher'
import routes from './routes'

const AppRoute = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    function messageEventHandler(data) {
      const { message } = data

      if (message === 'trigger') {
        setTimeout(async () => {
          await loadNotifications()
        }, 5000)
      }
    }

    const pusher = singlePusher.getInstance()
    let channel = pusher.subscribe('trigger-price')
    channel.bind('trigger-event', messageEventHandler)

    console.log(pusher)
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
