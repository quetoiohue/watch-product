import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Routes from '../routes'
import theme from './ThemeProvider'
import '../assets/css/index.css'

const newTheme = createMuiTheme(theme)

function App() {
  return (
    <ThemeProvider theme={newTheme}>
      <Suspense fallback={() => <div>Loading...</div>}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
