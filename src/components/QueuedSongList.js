import { useMutation } from '@apollo/client';
import {
	Avatar,
	IconButton,
	makeStyles,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

// const song = {
// 	title: 'Code',
// 	artist: 'Nivek',
// 	thumbnail:
// 		'https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png',
// };

function QueuedSongList({ queue }) {
	const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
	return greaterThanMd ? (
		<div
			style={{
				margin: '10px 0',
			}}
		>
			<Typography color='textSecondary' variant='button'>
				QUEUE ({queue.length})
			</Typography>
			{queue.map((song, i) => (
				<QueuedSong key={i} {...song} />
			))}
		</div>
	) : null;
}

const useStyles = makeStyles({
	avatar: {
		width: 44,
		height: 44,
	},
	text: {
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
	container: {
		display: 'grid',
		gridAutoFlow: 'column',
		gridTemplateColumns: '50px auto 50px',
		gridGap: 12,
		alignItems: 'center',
		marginTop: 10,
	},
	songInfoContainer: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
	},
});

function QueuedSong(song) {
	const { title, artist, thumbnail } = song;
	const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
		onCompleted: (data) => {
			localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue));
		},
	});

	const classes = useStyles();

	function handleAddOrRemoveFromQueue() {
		addOrRemoveFromQueue({
			variables: { input: { ...song, __typename: 'Song' } },
		});
	}

	return (
		<div className={classes.container}>
			<Avatar src={thumbnail} alt='Song Thumbnail' className={classes.avatar} />
			<div className={classes.songInfoContainer}>
				<Typography className={classes.text} varian='subtitle2'>
					{title}
				</Typography>
				<Typography
					className={classes.text}
					varian='body2'
					color='textSecondary'
				>
					{artist}
				</Typography>
			</div>
			<IconButton onClick={handleAddOrRemoveFromQueue}>
				<Delete color='error' />
			</IconButton>
		</div>
	);
}

export default QueuedSongList;
