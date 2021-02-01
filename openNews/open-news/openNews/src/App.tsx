import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import Toast from './components/toast'
import Routes from './routes'

import './App.scss'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Toast />
        <MuiPickersUtilsProvider utils={MomentUtils} locale={'pt-br'}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </Provider>
    )
  }
}

export default App
