import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import createLogger from "redux-logger"
import blogReducer from "../reducers"
import devTools from 'remote-redux-devtools'

const configureStore = ( initalState ) => {
  var reduxLogger = createLogger()
  const enhancer = compose(
    applyMiddleware( thunk ),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
  );
  const store = createStore( blogReducer, initalState, enhancer )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

function logger({ getState }) {
  return (next) => (action) => {
    console.log('+++ will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    // console.log('+++ state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}


export default configureStore
