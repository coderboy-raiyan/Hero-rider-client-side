import { css } from "@emotion/react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import useAuth from "./../../Hooks/useAuth";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoginPrivate = ({ children, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <MoonLoader color={"#000"} css={override} size={50} />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default LoginPrivate;
