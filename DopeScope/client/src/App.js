import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import ApplicationViews from "./ApplicationViews";
import Header from "./components/Header";
import { SideBar } from "./components/SideBar/SideBar";
import { onLoginStatusChange } from "./modules/authManager";
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <div className="container-nav">
      <SideBar isLoggedIn={isLoggedIn} />
      <ApplicationViews isLoggedIn={isLoggedIn} />
      </div>
    </Router>
  );
}

export default App;
