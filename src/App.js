import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import BlockProvider from "./Context/BlockProvider";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Footer from "./Pages/Footer/Footer";
import Profile from "./Pages/Home/Profile/Profile";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Payment from "./Pages/Payment/Payment";
import LoginPrivate from "./Pages/PrivateRoute/LoginPrivate";
import Register from "./Pages/Register/Register";
import "./tailwind.css";

const App = () => {
  return (
    <AuthProvider>
      <BlockProvider>
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
            <LoginPrivate path="/dashboard">
              <Dashboard />
            </LoginPrivate>
            <LoginPrivate path="/payment/:orderId">
              <Payment />
            </LoginPrivate>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </BlockProvider>
    </AuthProvider>
  );
};

export default App;
