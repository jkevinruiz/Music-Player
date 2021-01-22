import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://music-share.hasura.app/v1/graphql',
	cache: new InMemoryCache(),
});

function ApolloClientProvider({ children }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
