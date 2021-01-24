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
import { useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
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
	const [played, setPlayed] = useState(0);
	const [playedSeconds, setPlayedSeconds] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const [positionInQueue, setPositionInQueue] = useState(0);
	const reactPlayerRef = useRef();
	const classes = useStyles();

	useEffect(() => {
		const songIndex = data.queue.findIndex((song) => song.id === state.song.id);
		setPositionInQueue(songIndex);
	}, [data.queue, state.song.id]);

	useEffect(() => {
		const nextSong = data.queue[positionInQueue + 1];
		if (played === 1 && nextSong) {
			setPlayed(0);
			dispatch({
				type: 'SET_SONG',
				payload: { song: nextSong },
			});
		} else if (played === 1 && !nextSong) {
			dispatch({
				type: 'PAUSE_SONG',
			});
		}
	}, [data.queue, dispatch, played, positionInQueue]);

	function handleProgressChange(event, newValue) {
		setPlayed(newValue);
	}

	function handleSeekMouseDown(event) {
		setSeeking(true);
	}

	function handleSeekMouseUp(event) {
		setSeeking(false);
		reactPlayerRef.current.seekTo(played);
	}

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

	function handlePlayPreviousSong() {
		const prevSong = data.queue[positionInQueue - 1];

		if (prevSong) {
			setPlayed(0);
			dispatch({
				type: 'SET_SONG',
				payload: { song: prevSong },
			});
		}
	}

	function handlePlayNextSong() {
		const nextSong = data.queue[positionInQueue + 1];
		if (nextSong) {
			setPlayed(0);
			dispatch({
				type: 'SET_SONG',
				payload: { song: nextSong },
			});
		}
	}

	function formatDuration(seconds) {
		return new Date(seconds * 1000).toISOString().substr(11, 8);
	}

	const {
		song: { title, artist, thumbnail, url },
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
						<IconButton onClick={handlePlayPreviousSong}>
							<SkipPreviousSharp />
						</IconButton>
						<IconButton onClick={handleTogglePlay}>
							{isPlaying && url ? (
								<Pause className={classes.playIcon} />
							) : (
								<PlayArrow className={classes.playIcon} />
							)}
						</IconButton>
						<IconButton onClick={handlePlayNextSong}>
							<SkipNext />
						</IconButton>
						<Typography varian='subtitle1' component='p' color='textSecondary'>
							{formatDuration(playedSeconds)}
						</Typography>
					</div>
					<Slider
						onMouseDown={handleSeekMouseDown}
						onMouseUp={handleSeekMouseUp}
						onChange={handleProgressChange}
						value={played}
						type='range'
						min={0}
						max={1}
						step={0.01}
					/>
				</div>
				<ReactPlayer
					ref={reactPlayerRef}
					onProgress={({ played, playedSeconds }) => {
						if (!seeking) {
							setPlayed(played);
							setPlayedSeconds(playedSeconds);
						}
					}}
					url={url}
					playing={isPlaying}
					hidden
				/>
				<CardMedia className={classes.thumbnail} image={thumbnail} />
			</Card>
			<QueuedSongList queue={data.queue} />
		</>
	);
}

export default SongPlayer;
