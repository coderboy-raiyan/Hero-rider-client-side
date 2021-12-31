import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import Profile from "./Pages/Home/Profile/Profile";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Register/Register";
import "./tailwind.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
