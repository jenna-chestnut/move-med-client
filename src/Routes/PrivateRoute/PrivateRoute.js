import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { selectIdle } from '../../features/idle/idleSlice';
import { useSelector } from 'react-redux';
import TokenService from '../../Services/token-service';


export default function PrivateRoute({ component, admin, restricted, ...props }) {
  const Component = component;
  const loggedIn = TokenService.hasAuthToken();
  const user = TokenService.parseAuthToken();
  let hasAccess = false;
  const idle = useSelector(selectIdle);

  if (loggedIn && !idle) {
    if (!admin && !restricted) hasAccess = true;

    if (restricted && 
      (user.is_admin || user.is_provider)) hasAccess = true;

    if (admin && user.is_admin) hasAccess = true;
  }

  return (
    <Route
      {...props}
      render={componentProps => (
            hasAccess
              ? <Component {...componentProps} />
              : (
                <Redirect
                  to={{
                    pathname: '/',
                    state: { from: componentProps.location },
                  }}
                />
              )
      )}
    />
  )
}
