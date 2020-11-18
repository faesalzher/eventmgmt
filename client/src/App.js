import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/core/styles";
import { AuthProvider } from "./context/auth.jsx";
import { ContextProvider } from "./context/context.jsx";
import { Register as RegisterView, LogIn as LogInView } from "views";

import theme from "./theme";
import "./assets/scss/index.scss";
import Routes from "./Routes";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const browserHistory = createBrowserHistory();

const client = new ApolloClient({
  uri: " https://eventmgmt-deploy.herokuapp.com/graphql",
});
// https://eventmgmt-deploy.herokuapp.com/graphql
// http://localhost:5000/graphql
export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ContextProvider>
          <Router history={browserHistory}>
            <ThemeProvider theme={theme}>
              <Routes />
              <Route path="/login" component={LogInView} />
              <Route path="/register" component={RegisterView} />
            </ThemeProvider>
          </Router>
        </ContextProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
