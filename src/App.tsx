import React from "react";
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

function App() {
	const appBarTheme = createMuiTheme({
		palette: {
			text: {
				primary: "#053342",
			},
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
							Meetina
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>
			<CssBaseline />
			<Box mt={6}>
				<Container>
					<Home />
				</Container>
			</Box>
		</ThemeProvider>
	);
}
export default App;
