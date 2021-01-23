import { gql } from '@apollo/client';

export const GET_SONGS = gql`
	subscription getSongs {
		songs(order_by: { created_at: desc }) {
			id
			duration
			thumbnail
			title
			url
			artist
		}
	}
`;
