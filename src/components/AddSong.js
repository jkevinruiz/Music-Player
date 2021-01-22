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
import { useState } from 'react';

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
	const [dialog, setDialog] = useState(false);

	function handleCloseDialog() {
		setDialog(false);
	}

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
						src='https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png'
						alt='Song Thumbnail'
					/>
					<TextField margin='dense' name='title' label='Title' fullWidth />
					<TextField margin='dense' name='artist' label='Artist' fullWidth />
					<TextField
						className={classes.thumbnail}
						margin='dense'
						name='thumbnail'
						label='Thumbnail'
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button color='secondary'>Cancel</Button>
					<Button variant='outlined' color='primary'>
						Add Song
					</Button>
				</DialogActions>
			</Dialog>
			<TextField
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
			>
				Add
			</Button>
		</div>
	);
}

export default AddSong;
