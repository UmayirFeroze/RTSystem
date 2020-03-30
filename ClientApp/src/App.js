import React from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

// Screen Imports
import Landing from "./screens/Landing";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Transactions from "./screens/Transactions";
import MyBids from "./screens/MyBids";
import UserManual from "./screens/UserManual";
import OurPartners from "./screens/OurPartners";
import BuyerBids from "./components/BuyerBids";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/buyerBids"
          // render={props => <BuyerBids {...props} />}
          component={BuyerBids}
        />
        <Route exact path="/profile" component={Profile} />
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/mybids" component={MyBids} />
        <Route exact path="/help" component={UserManual} />
        <Route
          exact
          path="/our-partners"
          render={props => <OurPartners {...props} />}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
