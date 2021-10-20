import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { Hello } from "./components/Hello";
import { MicroscopeList } from "./components/Microscopes/MicroscopeList";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {/* {isLoggedIn ? <Hello /> : <Redirect to="/login" />} */}
          {<Hello />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/microscopes">
          <MicroscopeList />
          </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
