import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { Home } from "./components/Hello";
import { MicroscopeList } from "./components/Microscopes/MicroscopeList";
import { SlideList } from "./components/Slides/SlideList";
import { MicroscopeForm } from "./components/Microscopes/MicroscopeForm";
import { SlideForm } from "./components/Slides/SlideForm";
import { MicroscopeDetail } from "./components/Microscopes/MicroscopeDetails";
import { SlideDetails } from "./components/Slides/SlideDetails";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route exact path="/" >
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/microscope" exact>
          {isLoggedIn ? <MicroscopeList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/microscope/form/:scopeId(\d+)" >
          {isLoggedIn ? <MicroscopeForm /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/microscope/form" >
          {isLoggedIn ? <MicroscopeForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/microscope/:scopeId(\d+)" >
          {isLoggedIn ? <MicroscopeDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/slide" exact>
          {isLoggedIn ? <SlideList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/myslides" exact>
          {isLoggedIn ? <SlideList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/slide/form/:slideId(\d+)" exact>
          {isLoggedIn ? <SlideForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/slide/form" exact>
          {isLoggedIn ? <SlideForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/slide/:slideId(\d+)">
          {isLoggedIn ? <SlideDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
