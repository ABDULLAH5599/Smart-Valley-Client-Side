import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [LoggedIn, setLoggedIn]=useContext(UserContext);
    return (
        <Route
        {...rest}
        render={({ location }) =>
        LoggedIn.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;