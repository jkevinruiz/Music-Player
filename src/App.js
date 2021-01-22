import { Grid, Hidden, useMediaQuery } from '@material-ui/core';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';

function App() {
	const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
	const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
	return (
		<>
			<Hidden only='xs'>
				<Header />
			</Hidden>
			<Grid container={true} spacing={3}>
				<Grid
					item
					xs={12}
					md={7}
					style={{
						paddingTop: greaterThanSm ? 80 : 10,
					}}
				>
					<AddSong />
					<SongList />
				</Grid>
				<Grid
					item
					xs={12}
					md={5}
					style={
						greaterThanMd
							? {
									position: 'fixed',
									width: '100%',
									right: 0,
									top: 70,
							  }
							: {
									position: 'fixed',
									width: '100%',
									left: 0,
									bottom: 0,
							  }
					}
				>
					<SongPlayer />
				</Grid>
			</Grid>
		</>
	);
}

export default App;
