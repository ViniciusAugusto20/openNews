import React, { useState } from 'react'
import { Box, Button, MenuItem, Select, InputLabel } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { getupdateCurrentUser } from '../../actions/main-actions'
import { RootState } from '../../store/ducks'
import MainPage from '../../components/main-page'
import TextFieldDefault from '../../components/text-field-default'

import { TextFieldType } from '../../models/enums'
import IUser from '../../models/user'

import './style.scss'

const PageProfile = () => {
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = useState<IUser>(
    useSelector((state: RootState) => state?.main.currentUser)
  )
  const defaultTags = ['Tecnologia', 'Educação', 'Economia', 'Covid19', 'Mundo']
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrentUser({
      ...currentUser,
      tags: event.target.value as string[],
    })
  }
  const handleSaveChangeUser = async () => {
    dispatch(getupdateCurrentUser(currentUser))
  }
  return (
    <MainPage>
      <Box className="PageProfile">
        <Box className="ContainerProfile">
          <img
            alt="avatarProfile"
            src={currentUser.avatar}
            className="AvatarProfile"
          />
          <Box className="TextInput">
            <TextFieldDefault
              type={TextFieldType.TEXT}
              label="Usuário"
              placeholder="Insira seu Usuário"
              obrigatorio={true}
              value={currentUser.name}
              onChange={value =>
                setCurrentUser({
                  ...currentUser,
                  name: value,
                })
              }
              maxLength={100}
            />
          </Box>
          <Box className="TextInput">
            <TextFieldDefault
              type={TextFieldType.EMAIL}
              label="E-mail"
              placeholder="Insira sua senha de acesso"
              obrigatorio={true}
              value={currentUser.email}
              onChange={value =>
                setCurrentUser({
                  ...currentUser,
                  email: value,
                })
              }
            />
          </Box>
          <Box className="TextInput">
            <InputLabel className="InputTagSelectorProfile">
              Interesses
            </InputLabel>
            <Select
              label="Interesses"
              multiple
              className="TagSelectorProfile"
              value={currentUser.tags}
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {defaultTags.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Button
              className="ButtonSalvarProfile"
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleSaveChangeUser}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Box>
    </MainPage>
  )
}
export default PageProfile
