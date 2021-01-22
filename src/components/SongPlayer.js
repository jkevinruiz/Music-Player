import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	makeStyles,
	Slider,
	Typography,
} from '@material-ui/core';
import { PlayArrow, SkipNext, SkipPreviousSharp } from '@material-ui/icons';
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
	const classes = useStyles();

	return (
		<>
			<Card className={classes.container} variant='outlined'>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography varian='h5' component='h3'>
							Title
						</Typography>
						<Typography varian='subtitle1' component='p' color='textSecondary'>
							Arist
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton>
							<SkipPreviousSharp />
						</IconButton>
						<IconButton>
							<PlayArrow className={classes.playIcon} />
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
				<CardMedia
					className={classes.thumbnail}
					image='https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png'
				/>
			</Card>
			<QueuedSongList />
		</>
	);
}

export default SongPlayer;
