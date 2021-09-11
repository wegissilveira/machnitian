import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { AssetsState } from './ducks/assets/types'

import rootReducer from './ducks/rootReducer'
import rootSaga from './ducks/rootSaga'

export interface ApplicationState {
  assets: AssetsState,
}

const sagaMiddleware = createSagaMiddleware()

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware))


sagaMiddleware.run(rootSaga)

export default store