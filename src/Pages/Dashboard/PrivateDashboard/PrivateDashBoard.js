import { css } from "@emotion/react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import useAuth from "../../../Hooks/useAuth";

const override = css`
  display: block;
  margin: 20px auto;
`;

const PrivateDashBoard = ({ children, ...rest }) => {
  const { admin, isAdminLoading } = useAuth();

  if (isAdminLoading) {
    return <MoonLoader color={"#000"} css={override} size={50} />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        admin.admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateDashBoard;
