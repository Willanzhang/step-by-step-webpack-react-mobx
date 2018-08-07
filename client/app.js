import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import {
  BrowserRouter
} from 'react-router-dom'
import App from './views/App'
import AppState from './store/app-state'

const initialState = window.__INITIAL__STATE__ || {}

const root = document.getElementById('root')
// hydrate
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  )
}
render(App)
if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default // eslint-disable-line
    // ReactDOM.hydrate(<NextApp/>, document.getElementById('root'))
    render(NextApp)
  })
}
