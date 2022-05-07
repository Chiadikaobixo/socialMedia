import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact={true} />
      <Route path="/register" component={Register} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
)

export default App;