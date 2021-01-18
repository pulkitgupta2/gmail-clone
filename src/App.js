import React, { useEffect } from "react";
import { Home, Loading, Signin } from "./components";
import { useLocalContect } from "./context/context";
import { useMailContext } from "./context/MailCotext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const { appState, setAppState } = useLocalContect();
  const { onScreenMails } = useMailContext();
  useEffect(() => {
    if (appState === "loading") {
      setTimeout(() => {
        setAppState("home");
      }, 5000);
    }
  });
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            {appState === "home" && <Home />}
            {appState === "login" && <Signin />}
            {appState === "loading" && <Loading />}
          </div>
        </Route>

        {onScreenMails.map((value, index) => (
          <Route key={index} path={`/${value.id}`}>
            <Home mailData={value} showMails={false} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}

export default App;
