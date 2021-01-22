import { createMuiTheme } from '@material-ui/core';
import { teal, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: teal,
		secondary: blue,
	},
});

export default theme;
