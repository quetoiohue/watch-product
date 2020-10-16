import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../store'
import Routes from '../routes'
import Theme from './ThemeProvider'
import '../assets/css/index.css'
import DynamicModal from '../components/modals/DynamicModal'

function App() {
  return (
    <Provider store={store}>
      <Theme>
        <Suspense fallback={() => <div>Loading...</div>}>
          <BrowserRouter>
            <Routes />
            <DynamicModal />
          </BrowserRouter>
        </Suspense>
      </Theme>
    </Provider>
  )
}

export default App
