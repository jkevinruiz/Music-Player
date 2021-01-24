import { Grid, Hidden, useMediaQuery } from '@material-ui/core';
import { createContext, useContext, useReducer } from 'react';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import songReducer from './reducer';

// export const SongContext = createContext({
// 	song: {
// 		id: 'afdfeea5-5afc-462a-ad76-7a7586ca3817',
// 		title: 'When We Were Young - Live at The BRIT Awards',
// 		artist: 'Adele',
// 		thumbnail: 'http://img.youtube.com/vi/HDpCv71r-0U/0.jpg',
// 		duration: 284,
// 		url: 'https://www.youtube.com/watch?v=HDpCv71r-0U',
// 	},
// 	isPlaying: false,
// });
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
		</SongContext.Provider>
	);
}

export default App;
