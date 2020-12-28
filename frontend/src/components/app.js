import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/home_page";
import NavBarContainer from "./nav/navbar_container";


import ProfileContainer from './profile/profile_container';
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";

const App = () => {
  return (
    <div>
      <NavBarContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />

        <ProtectedRoute exact path="/profile" component={ProfileContainer} />

      </Switch>
    </div>
  )
};

export default App;
