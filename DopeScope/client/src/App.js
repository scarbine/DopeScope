import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import ApplicationViews from "./ApplicationViews";
import Header from "./components/Header";
import { SideBar } from "./components/SideBar/SideBar";
import { onLoginStatusChange } from "./modules/authManager";
import "./App.css"
import { Footer } from "./components/Footer/Footer";

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
      <div className="full-screen">
      <Header isLoggedIn={isLoggedIn} />
      <div className="container-nav">
      <SideBar isLoggedIn={isLoggedIn} />
      <div className="application-views">
      <ApplicationViews isLoggedIn={isLoggedIn} />
      </div>
      </div>
      {/* <Footer isLoggedIn={isLoggedIn}/> */}
      </div>
    </Router>
  );
}

export default App;
