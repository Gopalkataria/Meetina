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
	CardHeader,
	IconButton,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { getData, Meet, saveData } from "../scripts/data-storage";
import "./Home.css";

import { AddSharp, DeleteSharp } from "@material-ui/icons";

//eslint-disable-next-line
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

// function NewMeetingDialogContents(props: any) {
// 	return (
// 		<div>
// 			<DialogContent>
// 				<TextField autoFocus label='Meeting Name' fullWidth type='text' />
// 				<TextField multiline label='Meeting Description (optional)' fullWidth type='text' />

// 				<TextField
// 					// error={!URL_REGEX.test(newMeetUrl) && newMeetUrl !== ""}
// 					label='Meeting URL'
// 					fullWidth
// 					type='url'
// 				/>
// 			</DialogContent>
// 			<DialogActions>
// 				<Button onClick={handleDialogClose}>Cancel</Button>
// 				<Button
// 					disabled={newMeetUrl === "" || newMeetName === ""}
// 					variant='contained'
// 					color='secondary'
// 					onClick={handleDialogSaveAndClose}>
// 					Save  </Button>
// 			</DialogActions>
// 		</div>
// 	);
// }

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

	const [newMeet, setnewMeet] = useState<Meet>({ name: "", url: "", description: "", uid: 0 });

	const handleDialogClose = () => {
		setDialogOpen(false);
	};
	const handleDialogSaveAndClose = (newMeet: Meet) => {
		let time = new Date();
		let newMeetings = [
			...Meetings,
			{
				name: newMeet.name,
				url: newMeet.url,
				description: newMeet.description,
				uid: time.getTime(),
			},
		];
		setMeetings(newMeetings);
		saveData(newMeetings);
		handleDialogClose();
	};

	const deleteMeet = (uid: number, Meetings: Meet[]) => {
		let newMeetings = Meetings.filter((meet) => meet.uid !== uid);
		setMeetings(newMeetings);
		saveData(newMeetings);
	};

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const [Meetings, setMeetings] = useState<Meet[]>(getData());

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={3} direction='row' justify='center' alignItems='center'>
				{Meetings.map((meeting) => {
					return (
						<Grid key={meeting.uid} item xs={12} sm={12} md={6}>
							<Box>
								<Card elevation={2}>
									<CardHeader
										title={meeting.name}
										action={
											<IconButton
												style={{ color: red[500] }}
												onClick={() => deleteMeet(meeting.uid, Meetings)}
												aria-label='meeting options'>
												<DeleteSharp />
											</IconButton>
										}
									/>
									<CardContent>
										<Typography variant='h5'>{meeting.description}</Typography>
										<Typography variant='h5'>
											<Link href={meeting.url} color='primary'>
												{meeting.url}
											</Link>
										</Typography>
									</CardContent>
								</Card>
							</Box>
						</Grid>
					);
				})}

				<Fab color='secondary' aria-label='add-meeting' onClick={handleDialogOpen} className='fab'>
					<AddSharp></AddSharp>
				</Fab>

				<Dialog
					open={dialogOpen}
					fullWidth
					maxWidth='md'
					aria-labelledby='new-meeting'
					onClose={handleDialogClose}>
					<DialogTitle id='new-meeting-dialog'>Add Meeting</DialogTitle>
					<DialogContent>
						<TextField
							onBlur={(evt) => {
								let newMeetCopy = Object.assign({}, newMeet);

								newMeetCopy.name = evt.target.value;
								setnewMeet(newMeetCopy);
							}}
							autoFocus
							label='Meeting Name'
							fullWidth
							type='text'
						/>
						<TextField
							onBlur={(evt) => {
								let newMeetCopy = Object.assign({}, newMeet);

								newMeetCopy.description = evt.target.value;
								setnewMeet(newMeetCopy);
							}}
							multiline
							label='Meeting Description (optional)'
							fullWidth
							type='text'
						/>

						<TextField
							onChange={(evt) => {
								let newMeetCopy = Object.assign({}, newMeet);

								newMeetCopy.url = evt.target.value;
								setnewMeet(newMeetCopy);
							}}
							error={!URL_REGEX.test(newMeet.url) && newMeet.url !== ""}
							label='Meeting URL'
							fullWidth
							type='url'
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose}>Cancel</Button>
						<Button
							disabled={newMeet.url === "" || newMeet.name === ""}
							variant='contained'
							color='secondary'
							onClick={() => {
								handleDialogSaveAndClose(newMeet);
							}}>
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Grid>
		</ThemeProvider>
	);
}
