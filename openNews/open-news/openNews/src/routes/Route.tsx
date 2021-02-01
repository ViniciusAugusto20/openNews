import React from 'react'
import {
  Route as ReactRoute,
  RouteProps as ReactRouterProps,
  Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/ducks'

import IUser from '../models/user'

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const currentUser: IUser = useSelector(
    (state: RootState) => state?.main.currentUser
  )
  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!(currentUser.id !== undefined) ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/home',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}
export default Route
