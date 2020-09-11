import React, { useState } from "react";
import {
	Grid,
	Box,
	Typography,
	ThemeProvider,
	createMuiTheme,
	Card,
	Dialog,
	DialogContent,
	DialogTitle,
	CardContent,
	Link,
	Fab,
	TextField,
	DialogActions,
	Button,
} from "@material-ui/core";
import { getData, Meet, saveData } from "../scripts/data-storage";
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

	const [dialogOpen, setDialogOpen] = useState(false);
	let newMeetName = "",
		newMeetUrl = "";

	const handleDialogClose = () => {
		setDialogOpen(false);
	};
	const handleDialogSaveAndClose = () => {
		let time = new Date();
		let newMeetings = [...Meetings, { name: newMeetName, url: newMeetUrl, uid: time.getTime() }];
		setMeetings(newMeetings);
		saveData(newMeetings);
		handleDialogClose();
	};

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const [Meetings, setMeetings] = useState<Meet[]>(getData());

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={3} direction='row' justify='center' alignItems='center'>
				<Fab color='secondary' aria-label='add-meeting' onClick={handleDialogOpen} className='fab'>
					<AddSharp></AddSharp>
				</Fab>
				{Meetings.map((meeting) => {
					return (
						<Grid key={meeting.uid} item xs={12} sm={12} md={6}>
							<Box>
								<Card elevation={2}>
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

				<Dialog
					open={dialogOpen}
					fullWidth
					maxWidth='md'
					aria-labelledby='new-meeting'
					onClose={handleDialogClose}>
					<DialogTitle id='new-meeting-dialog'>Add Meeting</DialogTitle>
					<DialogContent>
						<TextField
							onChange={(evt) => {
								newMeetName = evt.target.value;
							}}
							autoFocus
							label='Meeting Name'
							fullWidth
							type='text'
						/>

						<TextField
							onChange={(evt) => {
								newMeetUrl = evt.target.value;
							}}
							label='Meeting URL'
							fullWidth
							type='url'
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose}>Cancel</Button>
						<Button variant='contained' color='secondary' onClick={handleDialogSaveAndClose}>
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Grid>
		</ThemeProvider>
	);
}
