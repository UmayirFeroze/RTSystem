import React from "react";
import "./App.css";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// Screen Imports
import Landing from "./screens/Landing";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Transactions from "./screens/Transactions";
import UserManual from "./screens/UserManual";
import OurPartners from "./screens/OurPartners";
import BuyerBids from "./components/BuyerBids";
import IndividualBuyerBid from "./components/IndividualBuyerBid";
import SellerCreateBid from "./components/SellerCreateBid";
import MyRequests from "./screens/MyRequests";
import MyQuotations from "./screens/MyQuotations";
import ResetPassword from "./components/ResetPassword";
import EditUser from "./components/EditUser";
import SellerPostedBids from "./components/SellerPostedBids";
import SellerQuotedBids from "./components/SellerQuotedBids";
import BuyerRequestedBids from "./components/BuyerRequestBids";
import BuyerRequestBidIndividual from "./components/BuyerRequestBidIndividual";
import User from "./components/User";
export const history = createBrowserHistory();

const App = () => (
  <BrowserRouter>
    <Switch>
      {/* Navigation Screens */}
      <Route exact path="/" component={Landing} />

      <Route exact path="/home" render={(props) => <Home {...props} />} />

      <Route
        exact
        path="/buyerBids"
        render={(props) => <BuyerBids {...props} />}
      />

      <Route exact path="/profile" render={(props) => <Profile {...props} />} />

      <Route
        exact
        path="/register"
        render={(props) => <Register {...props} />}
      />

      <Route exact path="/transactions" component={Transactions} />

      <Route
        exact
        path="/requests"
        render={(props) => <MyRequests {...props} />}
      />

      <Route
        exact
        path="/quotations"
        // component={MyQuotations}
        render={(props) => <MyQuotations {...props} />}
      />

      <Route exact path="/help" component={UserManual} />

      <Route
        exact
        path="/our-partners"
        render={(props) => <OurPartners {...props} />}
      />

      {/* Navigation Components */}
      <Route
        exact
        path="/buyerBid"
        render={(props) => <IndividualBuyerBid {...props} />}
      />

      <Route
        exact
        path="/sellerBid"
        render={(props) => <SellerCreateBid {...props} />}
      />

      <Route
        exact
        path="/resetpassword"
        render={(props) => <ResetPassword {...props} />}
      />
      <Route
        exact
        path="/editUser"
        render={(props) => <EditUser {...props} />}
      />
      <Route
        exact
        path="/postedBid"
        render={(props) => <SellerPostedBids {...props} />}
      />

      <Route
        exact
        path="/quotedBids"
        render={(props) => <SellerQuotedBids {...props} />}
      />

      <Route
        exact
        path="/requestBids"
        render={(props) => <BuyerRequestedBids {...props} />}
      />

      <Route
        exact
        path="/requestbid"
        render={(props) => <BuyerRequestBidIndividual {...props} />}
      />

      <Route exact path="/user" render={(props) => <User {...props} />} />
    </Switch>
  </BrowserRouter>
);

export default App;
