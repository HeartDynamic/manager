import React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { rootEpic, rootReducer } from './redux'
import { createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware, compose } from 'redux'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'

import App from './App'

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
    }
    body, p {
        margin: 0;
    }
    ul{
        padding: 0;
        margin: 0;
    }
    a {
        text-decoration: none;
    }
    li{
        list-style-type: none
    }
    input{
        border: 0;
        padding: 0;
        outline: none;
    }
    h1, h2, h3, h4{
        margin: 0;
    }
`
const loggerMiddleware = createLogger({
    collapsed: true,
})
const history = createBrowserHistory()
const epicMiddleware = createEpicMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore() {
    const store = createStore(
        rootReducer(history),
        composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware, loggerMiddleware))
    )
    epicMiddleware.run(rootEpic)
    return store
}

export const store = configureStore()

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <>
                <App />
                <GlobalStyle />
            </>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
