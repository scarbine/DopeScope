import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";

import ApplicationViews from "./ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";

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
      {/* <Header isLoggedIn={isLoggedIn} /> */}
      <ApplicationViews  />
      {/* <ApplicationViews isLoggedIn={isLoggedIn} /> */}
    </Router>
  );
}

export default App;
