import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './ducks'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // TODO: Caso queira debugar o store, descomente a linha acima,
    // mas para isso a extensão redux tools deve estar instalada no seu browser
    // sem essa extensão o sistema não funcionará
  )
)

export default store
