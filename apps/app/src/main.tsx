import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GlobalStyles } from 'twin.macro';
import App from './app/app';
import { ApolloError } from 'apollo-server-core';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const httpLink = createHttpLink({
  uri: process.env.NX_APOLLO_SERVER_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }: ApolloError) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: ApolloLink.from([httpLink, errorLink]),
});

root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
      <GlobalStyles />
    </ApolloProvider>
  </StrictMode>
);
