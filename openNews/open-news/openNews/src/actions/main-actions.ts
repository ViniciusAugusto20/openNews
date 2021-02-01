import Api, { ResponseData } from '../utils/api'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store/ducks'
import { Action } from 'redux'
import { Types } from '../store/ducks/main-duck'

import errorFormat from '../utils/error-formatter'
import { showToast } from '../components/toast'

import IUser from '../models/user'

export const setCurrentUser = (
  user: IUser
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  dispatch({
    type: Types.SET_CURRENT_USER,
    currentUser: user,
  })
}
export const getupdateCurrentUser = (
  dados: IUser
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  const api = new Api()
  await api.updateCurrentUser(dados, {
    onSuccess: async (resposta: ResponseData) => {
      if (resposta) {
        dispatch({
          type: Types.UPDATE_CURRENT_USER,
          currentUser: resposta,
        })
        showToast({
          type: 'success',
          message: 'Usuário atualizado com sucesso',
        })
      }
    },
    onError: async (error: Response) => {
      const errorMessage = await errorFormat(error)
      showToast({
        type: 'error',
        message: errorMessage,
      })
    },
  })
}
export const getNews = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action
> => async dispatch => {
  const api = new Api()
  await api.getNews({
    onSuccess: async (resposta: ResponseData) => {
      if (resposta) {
        dispatch({
          type: Types.GET_NEWS,
          news: resposta,
        })
      }
    },
    onError: async (error: Response) => {
      const errorMessage = await errorFormat(error)
      showToast({
        type: 'error',
        message: errorMessage,
      })
    },
  })
}
export const alterarExibicaoNoticias = (
  exibirTodasNoticias: boolean
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  dispatch({
    type: Types.ALTERAR_EXIBICAO_NOTICIAS,
    exibirTodasNoticias: exibirTodasNoticias,
  })
}
