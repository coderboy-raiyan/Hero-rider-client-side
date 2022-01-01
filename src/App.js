import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import Profile from "./Pages/Home/Profile/Profile";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import LoginPrivate from "./Pages/PrivateRoute/LoginPrivate";
import Register from "./Pages/Register/Register";
import "./tailwind.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <LoginPrivate exact path="/">
            <Profile />
          </LoginPrivate>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <LoginPrivate path="/profile">
            <Profile />
          </LoginPrivate>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
