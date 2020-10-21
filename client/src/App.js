import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import { AuthProvider } from "./context/auth.jsx";
import { Register as RegisterView, LogIn as LogInView } from "views";

import theme from "./theme";
import "./assets/scss/index.scss";
import Routes from "./Routes";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const browserHistory = createBrowserHistory();

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

export default function App() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
            <Route path="/login" component={LogInView} />
            <Route path="/register" component={RegisterView} />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
