import React from "react";
import { useState } from "react";
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
import { UserContext } from "./useContext";

const App = () => {

  const [user,setUser] = useState({
    isLoggedIn: false,
    currentUserId: null,
    currentUserName: null
  })

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Navbar />
        <Switch>
          <Route path={["/", "/login", "/signin"]} exact component={Login} />
          <Route path={["/register", "/signup"]} exact component={Register} />
          <Route path={"/dashboard"} exact component={Dashboard} />
          <Route path={"*"} exact component={NoMatchPage} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
