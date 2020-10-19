import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "context/auth.jsx";

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component, a, ...rest } = props;
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        localStorage.getItem("jwtToken") !== null || authTokens ? (
          <Layout a={props.a}>
            <Component {...matchProps} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;
