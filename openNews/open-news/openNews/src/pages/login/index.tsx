import React, { useState } from 'react'
import { Button, Box } from '@material-ui/core'
import { setCurrentUser } from '../../actions/main-actions'
import { useDispatch } from 'react-redux'

import TextFieldDefault from '../../components/text-field-default'
import { showToast } from '../../components/toast'
import { TextFieldType } from '../../models/enums'
import Logo from '../../assets/images/openNewsLogo.png'

import './style.scss'

const PaginaLogin = () => {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [camposValidos, setCamposValidos] = useState(true)
  const dispatch = useDispatch()
  const handleAcessarClickAsync = async () => {
    setCamposValidos(true)

    if (!login) {
      setCamposValidos(false)
      return
    }

    if (!senha) {
      setCamposValidos(false)
      return
    }
    fetch('http://localhost:8000/users')
      .then(res => res.json())
      .then(
        result => {
          if (
            result.find((user: any) => user.password === senha) &&
            result.find((user: any) => user.email === login)
          ) {
            dispatch(
              setCurrentUser(result.find((user: any) => user.email === login))
            )
          } else {
            showToast({
              type: 'error',
              message: 'Acesso Negado, Verifique se o usuário e senha.',
            })
          }
        },
        error => {
          showToast({
            type: 'error',
            message: error,
          })
        }
      )
  }
  return (
    <Box className="PageLogin">
      <Box className="ContainerLogin">
        <img className="LogoLogin" alt="logoLogin" src={Logo} />
        <Box className="TextInput">
          <TextFieldDefault
            type={TextFieldType.EMAIL}
            label="Usuário"
            placeholder="Insira seu Usuário"
            obrigatorio={true}
            value={login}
            onChange={value => setLogin(value)}
            dispararErro={!camposValidos}
            maxLength={100}
          />
        </Box>
        <Box className="TextInput">
          <TextFieldDefault
            type={TextFieldType.PASSWORD}
            label="Senha"
            placeholder="Insira sua senha de acesso"
            obrigatorio={true}
            value={senha}
            maxLength={18}
            onChange={value => setSenha(value)}
            onEnterPress={handleAcessarClickAsync}
            dispararErro={!camposValidos}
          />
        </Box>
        <Box>
          <Button
            className="ButtonLogin"
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleAcessarClickAsync}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PaginaLogin
