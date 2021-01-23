import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	split,
	HttpLink,
	gql,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
	uri: `https://music-share.hasura.app/v1/graphql`,
});

const wsLink = new WebSocketLink({
	uri: `ws://music-share.hasura.app/v1/graphql`,
	options: {
		reconnect: true,
	},
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

function ApolloClientProvider({ children }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
