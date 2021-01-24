import { createMuiTheme } from '@material-ui/core';
import { cyan, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: cyan[300],
		},
		secondary: {
			main: green[400],
		},
	},
});

export default theme;
