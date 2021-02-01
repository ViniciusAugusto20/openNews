import { createActions, createReducer } from 'reduxsauce'
import { AnyAction } from 'redux'

export const { Types, Creators } = createActions({
  setCurrentUser: [],
  getNews: [],
  alterarExibicaoNoticias: [],
  updateCurrentUser: [],
})

const INITIAL_STATE = {
  currentUser: [],
  news: [],
  exibirTodasNoticias: false,
}
const setCurrentUser = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    currentUser: action.currentUser,
  }
}
const getNews = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    news: action.news,
  }
}
const alterarExibicaoNoticias = (state = INITIAL_STATE, action: AnyAction) => ({
  ...state,
  exibirTodasNoticias: action.exibirTodasNoticias,
})

const updateCurrentUser = (state = INITIAL_STATE, action: AnyAction) => ({
  ...state,
  currentUser: action.currentUser,
})

/**
 * Handlers
 */
const HANDLERS = {
  // @ts-ignore
  [Types.SET_CURRENT_USER]: setCurrentUser,
  // @ts-ignore
  [Types.GET_NEWS]: getNews,
  // @ts-ignore
  [Types.ALTERAR_EXIBICAO_NOTICIAS]: alterarExibicaoNoticias,
  // @ts-ignore
  [Types.UPDATE_CURRENT_USER]: updateCurrentUser,
}

/**
 * Reducers
 */
const mainReducer = createReducer(INITIAL_STATE, HANDLERS)
export default mainReducer
