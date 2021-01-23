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
import { useMutation } from '@apollo/client';
import { ADD_SONG } from '../graphql/mutations';

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

const DEFAULT_SONG = {
	duration: 0,
	title: '',
	artist: '',
	thumbnail: '',
	url: '',
};

function AddSong() {
	const classes = useStyles();
	const [url, setUrl] = useState('');
	const [playable, setPlayable] = useState(false);
	const [song, setSong] = useState(DEFAULT_SONG);
	const [dialog, setDialog] = useState(false);
	const [addSong, { error }] = useMutation(ADD_SONG);

	useEffect(() => {
		const isPlayable =
			YoutubePlayer.canPlay(url) || SoundCloundPlayer.canPlay(url);
		setPlayable(isPlayable);
	}, [url]);

	function handleCloseDialog() {
		setDialog(false);
	}

	async function handleAddSong() {
		try {
			const { url, thumbnail, duration, title, artist } = song;
			await addSong({
				variables: {
					url: url.length > 0 ? url : null,
					thumbnail: thumbnail.length > 0 ? thumbnail : null,
					duration: duration > 0 ? duration : null,
					title: title.length > 0 ? title : null,
					artist: artist.length > 0 ? artist : null,
				},
			});
			handleCloseDialog();
			setSong(DEFAULT_SONG);
			setUrl('');
		} catch (error) {
			console.dir('Error adding song', error);
		}
	}

	function handleChangeSongData(event) {
		const { name, value } = event.target;
		setSong({
			...song,
			[name]: value,
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

	function handleError(field) {
		return error?.graphQLErrors[0]?.extensions?.path.includes(field);
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
						onChange={handleChangeSongData}
						error={handleError('title')}
						helperText={handleError('title') && 'Fill out field'}
					/>
					<TextField
						margin='dense'
						name='artist'
						label='Artist'
						fullWidth
						value={artist}
						onChange={handleChangeSongData}
						error={handleError('artist')}
						helperText={handleError('artist') && 'Fill out field'}
					/>
					<TextField
						margin='dense'
						name='thumbnail'
						label='Thumbnail'
						fullWidth
						value={thumbnail}
						onChange={handleChangeSongData}
						error={handleError('thumbnail')}
						helperText={handleError('thumbnail') && 'Fill out field'}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color='secondary'>
						Cancel
					</Button>
					<Button variant='outlined' color='primary' onClick={handleAddSong}>
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
