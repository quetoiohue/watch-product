import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'

import store from '../store'
import Routes from '../routes'
import theme from './ThemeProvider'
import '../assets/css/index.css'
import DynamicModal from '../components/modals/DynamicModal'

const newTheme = createMuiTheme(theme)

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={newTheme}>
          <Suspense fallback={() => <div>Loading...</div>}>
            <BrowserRouter>
              <Routes />
              <DynamicModal />
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App
