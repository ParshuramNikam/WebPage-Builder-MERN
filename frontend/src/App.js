import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./Home";
import Editor from "./Editor";
import { pageLoad } from "./redux/actions/pageAction";
import Login from "./user_pages/Login";
import Signup from "./user_pages/Signup";
import ForgetPassword from "./user_pages/ForgetPassword";
import ChangePassword from "./user_pages/ChangePassword";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    pageLoad()(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>

        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/forget-password" component={ForgetPassword}></Route>
        <Route exact path="/change-password/:otp/:userId" component={ChangePassword}></Route>

        <Route exact path="/editor/:pageId" component={Editor}></Route>
      </Switch>
    </Router>
  );
}

export default App;
