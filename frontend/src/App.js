import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Index from "./components/pages/Index";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
