import { useQuery } from '@apollo/client';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	CircularProgress,
	IconButton,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { PlayArrow, Save } from '@material-ui/icons';
import { GET_SONGS } from '../graphql/queries';

function SongList() {
	const { loading, error, data } = useQuery(GET_SONGS);

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 50,
				}}
			>
				<CircularProgress color='primary' />
			</div>
		);
	}

	if (error) {
		return <div>Error fetching songs</div>;
	}

	return (
		<div>
			{data.songs.map((song, i) => (
				<Song key={i} {...song} />
			))}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(3),
	},
	songInfoContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	songInfo: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
	},
	thumbnail: {
		objectFit: 'cover',
		width: 140,
		height: 140,
	},
}));

function Song({ title, artist, thumbnail }) {
	const classes = useStyles();

	return (
		<Card className={classes.container}>
			<div className={classes.songInfoContainer}>
				<CardMedia className={classes.thumbnail} image={thumbnail} />
				<div className={classes.songInfo}>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{title}
						</Typography>
						<Typography variant='body1' component='p' color='textSecondary'>
							{artist}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton size='small' color='primary'>
							<PlayArrow />
						</IconButton>
						<IconButton size='small' color='secondary'>
							<Save />
						</IconButton>
					</CardActions>
				</div>
			</div>
		</Card>
	);
}

export default SongList;
