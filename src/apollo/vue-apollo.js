import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: `https://graphql.contentstack.com/stacks/${process.env.VUE_APP_CONTENTSTACK_API_KEY}?environment=${process.env.VUE_APP_CONTENTSTACK_ENVIRONMENT}`,
  headers: {
    access_token: `${process.env.VUE_APP_CONTENTSTACK_DELIVERY_TOKEN}`,
  },
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export {
  apolloProvider as default,
};
