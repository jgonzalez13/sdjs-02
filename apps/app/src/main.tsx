import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { GlobalStyles } from 'twin.macro';
import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const httpLink = createHttpLink({
  uri: process.env.NX_APOLLO_SERVER_URL,
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: ApolloLink.from([httpLink]),
});

root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
      <GlobalStyles />
    </ApolloProvider>
  </StrictMode>
);
