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
import { GET_QUEUED_SONGS } from './queries';

const httpLink = new HttpLink({
	uri: `https:${process.env.REACT_APP_HASURA_URI}`,
});

const wsLink = new WebSocketLink({
	uri: `ws:${process.env.REACT_APP_HASURA_URI}`,
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

const typeDefs = gql`
	extend input SongInput {
		id: uuid!
		title: String!
		artist: String!
		thumbnail: String!
		duration: Float!
		url: String!
	}

	extend type Query {
		queue: [Song]!
	}

	extend type Mutation {
		addOrRemoveFromQueue(input: SongInput!): [Song]!
	}

	extend type Song {
		id: uuid!
		title: String!
		artist: String!
		thumbnail: String!
		duration: Float!
		url: String!
	}
`;

const client = new ApolloClient({
	connectToDevTools: true,
	link: splitLink,
	cache: new InMemoryCache(),
	typeDefs,
	resolvers: {
		Mutation: {
			addOrRemoveFromQueue: (_, { input }, { cache }) => {
				const queryResult = cache.readQuery({
					query: GET_QUEUED_SONGS,
				});
				if (queryResult) {
					const { queue } = queryResult;
					const isInQueue = queue.some((song) => song.id === input.id);
					const newQueue = isInQueue
						? queue.filter((song) => song.id !== input.id)
						: [...queue, input];
					cache.writeQuery({
						query: GET_QUEUED_SONGS,
						data: { queue: newQueue },
					});

					return newQueue;
				}

				return [];
			},
		},
	},
});

const hasQueue = Boolean(localStorage.getItem('queue'));

const initialData = {
	queue: hasQueue ? JSON.parse(localStorage.getItem('queue')) : [],
};

client.writeQuery({
	query: gql`
		query Queue {
			queue
		}
	`,
	data: {
		...initialData,
	},
});

function ApolloClientProvider({ children }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
