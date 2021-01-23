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
import { Pause, PlayArrow, Save } from '@material-ui/icons';
import { useSubscription } from '@apollo/client';
import { GET_SONGS } from '../graphql/subscriptions';
import { SongContext } from '../App';
import { useContext, useEffect, useState } from 'react';

function SongList() {
	const { loading, error, data } = useSubscription(GET_SONGS);

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

function Song(song) {
	const { title, artist, thumbnail, id } = song;
	const classes = useStyles();

	const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
	const { state, dispatch } = useContext(SongContext);

	console.log(state);

	useEffect(() => {
		const isSongPlaying = state.isPlaying && id === state.song.id;
		setCurrentSongPlaying(isSongPlaying);
	}, [id, state.song.id, state.isPlaying]);

	function handleTogglePlay() {
		dispatch({
			type: 'SET_SONG',
			payload: { song },
		});

		dispatch(
			state.isPlaying
				? {
						type: 'PAUSE_SONG',
				  }
				: {
						type: 'PLAY_SONG',
				  }
		);
	}

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
						<IconButton size='small' color='primary' onClick={handleTogglePlay}>
							{currentSongPlaying ? (
								<Pause className={classes.playIcon} />
							) : (
								<PlayArrow className={classes.playIcon} />
							)}
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
