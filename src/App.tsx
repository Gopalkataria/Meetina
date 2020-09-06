import React from "react";
import "./App.css";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Container,
	createMuiTheme,
	ThemeProvider,
	CssBaseline,
	Box,
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
					<IconButton color='secondary' edge={"start"}>
						<Spa />
					</IconButton>
					<Typography color='textPrimary' variant='h4'>
						Meetina
					</Typography>
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
