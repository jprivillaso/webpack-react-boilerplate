import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import Reducers from '~reducers';
import rootSaga from '~sagas';

function enableHMR(store) {
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('~reducers', () => {
      const nextReducer = require('~reducers').default;
      store.replaceReducer(nextReducer);
    });
  }
}

export default function configureStore() {
  // Create the saga middleware
  const sagaMiddleaware = createSagaMiddleware();

  // Mount the middleware and reducer to the store
  const store = createStore(Reducers, compose(
    applyMiddleware(sagaMiddleaware),
    window.devToolsExtension ? window.devToolsExtension() : f => f));

  // Now run the saga
  sagaMiddleaware.run(rootSaga);
  store.close = () => store.dispatch(END);

  enableHMR(store);
  return store;

}
