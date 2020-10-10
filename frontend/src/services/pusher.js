import Pusher from 'pusher-js'

var singlePusher = (function () {
  var instance

  function createInstance() {
    const newInstance = new Pusher(process.env.REACT_APP_APP_KEY, {
      cluster: process.env.REACT_APP_APP_CLUSTER,
      encrypted: true,
    })

    return newInstance
  }

  return {
    getInstance: function () {
      if (!(instance instanceof Pusher)) {
        instance = createInstance()
      }

      return instance
    },
  }
})()

export default singlePusher
