import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import ApolloClientProvider from './graphql/client';

ReactDOM.render(
	<React.StrictMode>
		<ApolloClientProvider>
			<MuiThemeProvider theme={theme}>
				<CssBaseline>
					<App />
				</CssBaseline>
			</MuiThemeProvider>
		</ApolloClientProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
