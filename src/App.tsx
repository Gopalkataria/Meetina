// set up routers over here for cross page navigation


import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	createMuiTheme,
	ThemeProvider,
	CssBaseline,
	Box,
	Icon,
} from "@material-ui/core";
import { Spa } from "@material-ui/icons";
import Home from "./Home/Home";
import Accounts from "./Accounts/Accounts";

function App() {
	const appBarTheme = createMuiTheme({
		palette: {
	// type : "dark" , // uncomment this line to switch to dark mode

      primary: {
        main: "#ffffff",
        contrastText: "#053342",
      },
      secondary: {
        main: "#053342",
      },
		},
	});

	return (
		<ThemeProvider theme={appBarTheme}>
			<CssBaseline />
			<AppBar position='sticky'>
				<Toolbar>
					<Icon component={Spa} color='secondary'></Icon>

					<Box pl={3}>
						<Typography color='textPrimary' variant='h4'>
							Meeting Links
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>
			<CssBaseline />
			<Box mt={6}>
				<Container>
					<Router>
						<Switch>
							<Route path='/accounts'>
								<Accounts />
							</Route>
							<Route path='/'>
								<Home />
							</Route>
						</Switch>
					</Router>
				</Container>
			</Box>
		</ThemeProvider>
	);
}
export default App;
