import React from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NoMatchPage from "./components/NoMatchPage";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path={["/", "/login", "/signin"]} exact component={Login} />
        <Route path={["/register", "/signup"]} exact component={Register} />
        <Route path={"/dashboard"} exact component={Dashboard} />
        <Route path={"*"} exact component={NoMatchPage} />
      </Switch>
    </Router>
  );
};

export default App;
