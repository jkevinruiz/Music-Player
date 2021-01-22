import {
	Avatar,
	IconButton,
	makeStyles,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const song = {
	title: 'Code',
	artist: 'Nivek',
	thumbnail:
		'https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png',
};

function QueuedSongList() {
	const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
	return greaterThanMd ? (
		<div
			style={{
				margin: '10px 0',
			}}
		>
			<Typography color='textSecondary' variant='button'>
				QUEUE (5)
			</Typography>
			{Array.from({ length: 5 }, () => song).map((song, i) => (
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

function QueuedSong({ title, artist, thumbnail }) {
	const classes = useStyles();

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
			<IconButton>
				<Delete color='error' />
			</IconButton>
		</div>
	);
}

export default QueuedSongList;
