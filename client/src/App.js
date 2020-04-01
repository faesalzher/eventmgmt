import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
// import validate from 'validate.js';

// import { chartjs } from './helpers';
import theme from './theme';
// import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
//import validators from './common/validators';
import Routes from './Routes';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';

const browserHistory = createBrowserHistory();
// Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
//   draw: chartjs.draw
// });

// validate.validators = {
//   ...validate.validators,
//   ...validators
// };
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: 'https://eventmgmt-deploy-testing.herokuapp.com/graphql',
});


export default function App() {
  return (
    <ApolloProvider client={client}>    
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>     
    </ApolloProvider>
  );
}
