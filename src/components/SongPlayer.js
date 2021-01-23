import { useQuery } from '@apollo/client';
import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	makeStyles,
	Slider,
	Typography,
} from '@material-ui/core';
import {
	Pause,
	PlayArrow,
	SkipNext,
	SkipPreviousSharp,
} from '@material-ui/icons';
import { useContext } from 'react';
import { SongContext } from '../App';
import { GET_QUEUED_SONGS } from '../graphql/queries';
import QueuedSongList from './QueuedSongList';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0px 15px',
	},
	content: {
		flex: '1 0 auto',
	},
	thumbnail: {
		width: 150,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	playIcon: {
		height: 38,
		width: 38,
	},
}));

function SongPlayer() {
	const { data } = useQuery(GET_QUEUED_SONGS);

	const { state, dispatch } = useContext(SongContext);
	const classes = useStyles();

	function handleTogglePlay() {
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

	const {
		song: { title, artist, thumbnail, duration },
		isPlaying,
	} = state;

	return (
		<>
			<Card className={classes.container} variant='outlined'>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography varian='h5' component='h3'>
							{title}
						</Typography>
						<Typography varian='subtitle1' component='p' color='textSecondary'>
							{artist}
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton>
							<SkipPreviousSharp />
						</IconButton>
						<IconButton onClick={handleTogglePlay}>
							{isPlaying ? (
								<Pause className={classes.playIcon} />
							) : (
								<PlayArrow className={classes.playIcon} />
							)}
						</IconButton>
						<IconButton>
							<SkipNext />
						</IconButton>
						<Typography varian='subtitle1' component='p' color='textSecondary'>
							00:01:30
						</Typography>
					</div>
					<Slider type='range' min={0} max={1} step={0.01} />
				</div>
				<CardMedia className={classes.thumbnail} image={thumbnail} />
			</Card>
			<QueuedSongList queue={data.queue} />
		</>
	);
}

export default SongPlayer;
