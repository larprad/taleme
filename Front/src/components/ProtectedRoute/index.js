import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({
  children,
  isLogged,
  ...rest
}) => (
  <Route
    {...rest}
    render={() => (isLogged === true
      ? children
      : <Redirect to="/" />)}
  />
);

ProtectedRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
