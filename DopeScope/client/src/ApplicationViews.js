import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { Hello } from "./components/Hello";
import { MicroscopeList } from "./components/Microscopes/MicroscopeList";
import { SlideList } from "./components/Slides/SlideList";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/microscopes">
          {isLoggedIn ? <MicroscopeList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/slide">
          {isLoggedIn ? <SlideList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
