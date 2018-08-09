import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import { JssProvider } from 'react-jss'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from './views/App'
import { createStoreMap } from './store/store'

// 让mobx在服务端渲染的时候不会重复数据变换
useStaticRendering(true)

export { createStoreMap }

// export default (stores, routerContext, url) => ( // eslint-disable-line
//   <Provider {...stores}>
//     <StaticRouter context={routerContext} location={url}>
//       <App />
//     </StaticRouter>
//   </Provider>
// )
export default (stores, routerContext, url, sheetsRegistry, generateClassName, sheetsManager, theme) => ( // eslint-disable-line
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)
