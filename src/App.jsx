import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
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
import Payment from "./components/Payment";
import ProductList from "./components/ProductList";
import Register from "./components/Register";
import Store from "./components/Store";
import { UserContext } from "./useContext";

const initialUser = {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null,
};

let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole,
      };
    case "logout":
      return {
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
        currentUserRole: null,
      };
    default:
      return state
  }
};

const App = () => {

  const [user, dispatch] = useReducer(reducer, initialUser);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <Router>
        <Navbar />
        <Switch>
          <Route path={["/", "/login", "/signin"]} exact component={Login} />
          <Route path={["/register", "/signup"]} exact component={Register} />
          <Route path={"/dashboard"} exact component={Dashboard} />
          <Route path={"/pay"} exact component={Payment} />
          <Route path={"/store"} exact component={Store} />
          <Route path={"/products"} exact component={ProductList} />
          <Route path={"*"} exact component={NoMatchPage} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
