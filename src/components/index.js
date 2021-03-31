import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from 'store'
import ErrorBoundary from 'commons/ErrorBoundary'

import App from 'components/App'


export default function Main() {
  return (
        <Provider store={store}>
            <Router>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </Router>
        </Provider>
  )
}
