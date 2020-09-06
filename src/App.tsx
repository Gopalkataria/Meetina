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
	Card,
	CardContent,
	Link,
	Grid,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

interface Meet {
	name: string;
	url: string;
}

function App() {
	const theme = createMuiTheme({
		// carefully curated set of theme colors and fonts, don't change anything here
		palette: {
			// type : "dark" , // uncomment this line to switch to dark mode
			primary: {
				main: "#9c27b0",
			},
			secondary: {
				main: "#ffea00",
			},
		},
	});

	const Meetings: Meet[] = [
		{ name: "a", url: "https://google.com" },
		{ name: "b", url: "https://google.com" },
		{ name: "c", url: "https://google.com" },
		{ name: "d", url: "https://google.com" },
		{ name: "e", url: "https://google.com" },
		{ name: "f", url: "https://google.com" },
		{ name: "g", url: "https://google.com" },
		{ name: "h", url: "https://google.com" },
		{ name: "i", url: "https://google.com" },
		{ name: "j", url: "https://google.com" },
		{ name: "k", url: "https://google.com" },
		{ name: "l", url: "https://google.com" },
		{ name: "m", url: "https://google.com" },
		{ name: "n", url: "https://google.com" },
		{ name: "o", url: "https://google.com" },
		{ name: "p", url: "https://google.com" },
		{ name: "q", url: "https://google.com" },
		{ name: "r", url: "https://google.com" },
		{ name: "s", url: "https://google.com" },
		{ name: "t", url: "https://google.com" },
		{ name: "a", url: "https://google.com" },
	];

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position='sticky'>
				<Toolbar>
					<IconButton edge={"start"}>
						<Menu />
					</IconButton>
					<Typography variant='h4'>Meetina</Typography>
				</Toolbar>
			</AppBar>

			<Box mt={6}>
				<Container>
					<Grid container spacing={3} direction='row' justify='center' alignItems='center'>
						{Meetings.map((meeting, uid) => {
							return (
								<Grid item xs={12} sm={12} md={6}>
									<Box>
										<Card draggable key={uid}>
											<CardContent>
												<Typography variant='body1'>{meeting.name}</Typography>
												<Link>{meeting.url}</Link>
											</CardContent>
										</Card>
									</Box>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</Box>
		</ThemeProvider>
	);
}
export default App;
