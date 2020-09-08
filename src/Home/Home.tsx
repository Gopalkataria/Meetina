import React from "react";
import {
	Grid,
	Box,
	Typography,
	ThemeProvider,
	createMuiTheme,
	Card,
	CardContent,
	Link,
	Fab,
} from "@material-ui/core";
import { readData } from "../scripts/data-storage";
import "./Home.css";

import { AddSharp } from "@material-ui/icons";

export default function Home() {
	const theme = createMuiTheme({
		// carefully curated set of theme colors and fonts, don't change anything here
		palette: {
			// type : "dark" , // uncomment this line to switch to dark mode

			primary: {
				main: "#673AB7",
				contrastText: "#053342",
			},
			secondary: {
				main: "#053342",
			},
		},
	});
	const Meetings = readData();

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={3} direction='row' justify='center' alignItems='center'>
				<Fab color='secondary' className='fab'>
					<AddSharp></AddSharp>
				</Fab>
				{Meetings.map((meeting, uid) => {
					return (
						<Grid key={uid} item xs={12} sm={12} md={6}>
							<Box>
								<Card elevation={2} key={uid}>
									<CardContent>
										<Typography variant='body1'>{meeting.name}</Typography>
										<Link href={meeting.url} color='primary'>
											{meeting.url}
										</Link>
									</CardContent>
								</Card>
							</Box>
						</Grid>
					);
				})}
			</Grid>
		</ThemeProvider>
	);
}
