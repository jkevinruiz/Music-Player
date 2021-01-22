import { useEffect, useState } from 'react';
import {
	makeStyles,
	InputAdornment,
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';
import ReactPlayer from 'react-player/lazy';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import SoundCloundPlayer from 'react-player/lib/players/SoundCloud';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
	},
	urlInput: {
		margin: theme.spacing(1),
	},
	addSongButton: {
		margin: theme.spacing(1),
	},
	dialog: {
		textAlign: 'center',
	},
	thumbnail: {
		width: '90%',
	},
}));

function AddSong() {
	const classes = useStyles();
	const [url, setUrl] = useState();
	const [playable, setPlayable] = useState(false);
	const [song, setSong] = useState({
		duration: 0,
		title: '',
		artist: '',
		thumbnail: '',
	});
	const [dialog, setDialog] = useState(false);

	useEffect(() => {
		const isPlayable =
			YoutubePlayer.canPlay(url) || SoundCloundPlayer.canPlay(url);
		setPlayable(isPlayable);
	}, [url]);

	function handleCloseDialog() {
		setDialog(false);
	}

	function handleEditSongData(event) {
		const name = event.target.name;
		setSong({
			...song,
			[name]: event.target.value,
		});
	}

	async function handleGetSongData({ player }) {
		const nestedPlayer = player.player.player;
		let songData;
		if (nestedPlayer.getVideoData) {
			songData = await getYoutubeInfo(nestedPlayer);
		} else if (nestedPlayer.getCurrentSound) {
			songData = await getSoundCloudInfo(nestedPlayer);
		}

		setSong({
			...songData,
			url,
		});
	}

	function getYoutubeInfo(player) {
		const duration = player.getDuration();
		const { title, video_id, author: artist } = player.getVideoData();
		const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
		return {
			duration,
			title,
			artist,
			thumbnail,
		};
	}

	function getSoundCloudInfo(player) {
		return new Promise((resolve) => {
			player.getCurrentSound((songData) => {
				if (songData) {
					return resolve({
						duration: Number(songData.duration / 1000),
						title: songData.title,
						artist: songData.user.username,
						thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
					});
				}
			});
		});
	}

	const { thumbnail, title, artist } = song;

	return (
		<div className={classes.container}>
			<Dialog
				className={classes.dialog}
				open={dialog}
				onClose={handleCloseDialog}
			>
				<DialogTitle>Edit Song</DialogTitle>
				<DialogContent>
					<img
						className={classes.thumbnail}
						src={thumbnail}
						alt='Song Thumbnail'
					/>
					<TextField
						margin='dense'
						name='title'
						label='Title'
						fullWidth
						value={title}
						onChange={handleEditSongData}
					/>
					<TextField
						margin='dense'
						name='artist'
						label='Artist'
						fullWidth
						value={artist}
						onChange={handleEditSongData}
					/>
					<TextField
						margin='dense'
						name='thumbnail'
						label='Thumbnail'
						fullWidth
						value={thumbnail}
						onChange={handleEditSongData}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color='secondary'>
						Cancel
					</Button>
					<Button variant='outlined' color='primary'>
						Add Song
					</Button>
				</DialogActions>
			</Dialog>
			<TextField
				onChange={(event) => setUrl(event.target.value)}
				value={url}
				className={classes.urlInput}
				placeholder='Add Youtube or Soundcloud url'
				fullWidth
				margin='normal'
				type='url'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Link />
						</InputAdornment>
					),
				}}
			/>
			<Button
				className={classes.addSongButton}
				variant='contained'
				color='primary'
				endIcon={<AddBoxOutlined />}
				onClick={() => setDialog(true)}
				disabled={!playable}
			>
				Add
			</Button>
			{playable ? (
				<ReactPlayer hidden url={url} onReady={handleGetSongData} />
			) : null}
		</div>
	);
}

export default AddSong;
