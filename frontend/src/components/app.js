import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import MainPage from "./home/home_page";
import NavBarContainer from "./nav/navbar_container";


import ProfileContainer from './profile/profile_container';
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";

const App = () => {
  return (
    <div>
      <NavBarContainer />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />

        <ProtectedRoute exact path="/profile" component={ProfileContainer} />

      </Switch>
    </div>
  )
};

export default App;
