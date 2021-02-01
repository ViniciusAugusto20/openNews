import { combineReducers } from 'redux'

import mainReducer from './main-duck'

const rootReducer = combineReducers({
  main: mainReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
