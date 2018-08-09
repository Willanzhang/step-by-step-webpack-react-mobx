import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import {
  BrowserRouter
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'
import pink from '@material-ui/core/colors/pink'
import App from './views/App'
import AppState from './store/app-state'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    accent: pink,
    type: 'light'
  }
})

const initialState = window.__INITIAL__STATE__ || {}

const createApp = (TheApp) => {
  class Main extends React.Component {
  // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}

const root = document.getElementById('root')
// hydrate
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  )
}
render(createApp(App))
if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default // eslint-disable-line
    // ReactDOM.hydrate(<NextApp/>, document.getElementById('root'))
    render(createApp(NextApp))
  })
}
