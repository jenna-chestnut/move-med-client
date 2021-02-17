import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { selectIdle } from '../../features/idle/idleSlice';
import { useSelector } from 'react-redux';
import TokenService from '../../Services/token-service';


export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component;
  const loggedIn = TokenService.hasAuthToken();
  const idle = useSelector(selectIdle);

  return (
    <Route
      {...props}
      render={componentProps => (
          !loggedIn || idle
              ? <Component {...componentProps} />
              : (
                <Redirect
                  to={{
                    pathname: '/dashboard',
                    state: { from: componentProps.location },
                  }}
                />
              )
      )}
    />
  )
}