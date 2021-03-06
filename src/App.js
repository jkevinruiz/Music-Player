import { Grid, Hidden, useMediaQuery } from '@material-ui/core';
import { createContext, useContext, useReducer } from 'react';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import songReducer from './reducer';

export const SongContext = createContext({
	song: {
		id: '',
		title: '',
		artist: '',
		thumbnail: '',
		duration: 0,
		url: '',
	},
	isPlaying: false,
});

function App() {
	const initialSongState = useContext(SongContext);
	const [state, dispatch] = useReducer(songReducer, initialSongState);

	const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
	const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

	return (
		<SongContext.Provider value={{ state, dispatch }}>
			<Hidden only='xs'>
				<Header />
			</Hidden>
			<Grid container={true}>
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
									// position: 'static',
									width: '100%',
									right: 0,
									// top: 70,
									marginTop: '70px',
							  }
							: {
									position: 'sticky',
									width: '100%',
									left: 0,
									bottom: 0,
							  }
					}
				>
					<SongPlayer />
				</Grid>
			</Grid>
		</SongContext.Provider>
	);
}

export default App;
