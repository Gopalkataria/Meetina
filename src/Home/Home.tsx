import React, { useState } from "react";
import {
	Grid,
	Box,
	Typography,
	IconButton,
	ThemeProvider,
	createMuiTheme,
	Card,
	CardContent,
	Link,
	Fab,
} from "@material-ui/core";
import { Meet, readData } from "../scripts/data-storage";
import "./Home.css";

import { AddSharp } from "@material-ui/icons";

export default function Home() {
	const theme = createMuiTheme({
		// carefully curated set of theme colors and fonts, don't change anything here
		palette: {
			// type : "dark" , // uncomment this line to switch to dark mode

			primary: {
				main: "#053342",
				contrastText: "#053342",
			},
			secondary: {
				main: "#258965",
			},
		},
	});
	const [Meetings, setMeetings] = useState(readData());

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={3} direction='row' justify='center' alignItems='center'>
				<Fab color='secondary' className='fab'>
					<IconButton>
						<AddSharp />
					</IconButton>
				</Fab>
				{Meetings.map((meeting, uid) => {
					return (
						<Grid item xs={12} sm={12} md={6}>
							<Box>
								<Card draggable distance={4} key={uid}>
									<CardContent>
										<Typography variant='body1'>{meeting.name}</Typography>
										<Link color={primary}>{meeting.url}</Link>
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
