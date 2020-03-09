import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/browser'
import 'semantic-ui-css/semantic.min.css'
import 'Assets/bootstrap.css'
import 'Assets/custom.scss'

import store from 'Utilities/store'
import { basePath, inProduction } from 'Utilities/common'
import App from 'Components/App'
import ErrorBoundary from 'Components/ErrorBoundary'
import ConnectedIntlProvider from 'Components/ConnectedIntlProvider'

const dsn = inProduction
  ? 'https://509ab4585bb54fda8a94a461c1007146@toska.cs.helsinki.fi/13' : null

Sentry.init({
  dsn,
  environment: basePath === '/' ? 'production' : 'staging',
  release: `mobvita@${__COMMIT__}`, // eslint-disable-line no-undef
})

// This removes most of responsivevoice's logging.
window.responsiveVoice.OnVoiceReady = () => {
  window.responsiveVoice.debug = 0
}


const refresh = () => render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <BrowserRouter basename={basePath}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root'),
)

refresh()

if (module.hot) {
  module.hot.accept()
}
