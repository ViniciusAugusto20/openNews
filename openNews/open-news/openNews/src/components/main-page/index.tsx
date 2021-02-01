import React from 'react'
import clsx from 'clsx'
import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  Divider,
  CssBaseline,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@material-ui/core'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../store/ducks'
import { alterarExibicaoNoticias } from '../../actions/main-actions'

import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExitToApp from '@material-ui/icons/ExitToApp'
import AccountCircle from '@material-ui/icons/AccountCircle'

import './style.scss'

interface Props {
  children: React.ReactNode
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: 'blue!important',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -285,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
)

const MainPage = (props: Props) => {
  const { children } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const seeAllNews = useSelector(
    (state: RootState) => state?.main.exibirTodasNoticias
  )
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleChange = () => {
    if (seeAllNews === false) {
      dispatch(alterarExibicaoNoticias(true))
    } else {
      dispatch(alterarExibicaoNoticias(false))
    }
  }
  const handleChangePage = (index: number) => {
    handleDrawerClose()
    switch (index) {
      case 0:
        history.push('/home')
        break
      case 1:
        history.push('/profile')
        break
      case 2:
        history.push('/sair')
        break
    }
  }
  const exitApplication = async () => {
    localStorage.removeItem('@newsNow:user')
    window.location.reload()
  }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className="TitlePrincipal">Open News</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Feed', 'Perfil'].map((text, index) => (
              <ListItem
                onClick={() => handleChangePage(index)}
                button
                key={text}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      className="IconLeftBar"
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem className="ContainerSwitchMainpage">
              <Switch
                checked={!seeAllNews}
                onChange={handleChange}
                className="SwitchMainPage"
                color="default"
                name="checkedAllNews"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <ListItemText primary={'Filtrar por interesses'} />
            </ListItem>
          </List>
          <Divider />
          <ListItem onClick={() => exitApplication()} button key={'Sair'}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={'Sair'} />
          </ListItem>
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    </>
  )
}

export default MainPage
