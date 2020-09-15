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
import { red, blue } from "@material-ui/core/colors";
import { getData, Meet, saveData } from "../scripts/data-storage";
import "./Home.css";

import { AddSharp, EditSharp, DeleteSharp } from "@material-ui/icons";

//eslint-disable-next-line
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

function NewMeetingDialogContents(props: any) {
	return (
		<div>
			<DialogContent>
				<TextField
					onBlur={(evt) => {
						let newMeetCopy = Object.assign({}, props.newMeet);

						newMeetCopy.name = evt.target.value;
						props.setnewMeet(newMeetCopy);
					}}
					value={props.newMeet.name}
					autoFocus
					label='Meeting Name'
					fullWidth
					type='text'
				/>
				<TextField
					onBlur={(evt) => {
						let newMeetCopy = Object.assign({}, props.newMeet);

						newMeetCopy.description = evt.target.value;
						props.setnewMeet(newMeetCopy);
					}}
					value={props.newMeet.description}
					multiline
					label='Meeting Description (optional)'
					fullWidth
					type='text'
				/>

				<TextField
					onChange={(evt) => {
						let newMeetCopy = Object.assign({}, props.newMeet);

						newMeetCopy.url = evt.target.value;
						props.setnewMeet(newMeetCopy);
					}}
					value={props.newMeet.url}
					error={!URL_REGEX.test(props.newMeet.url) && props.newMeet.url !== ""}
					label='Meeting URL'
					fullWidth
					type='url'
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleDialogClose}>Cancel</Button>
				<Button
					disabled={props.newMeet.url === ""}
					variant='contained'
					color='secondary'
					onClick={() => {
						props.handleDialogSaveAndClose(props.newMeet);
					}}>
					Save
				</Button>
			</DialogActions>
		</div>
	);
}

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

	const [newMeet, setNewMeet] = useState<Meet>({ name: "", url: "", description: "", uid: 0 });

	const handleDialogClose = () => {
		setDialogOpen(false);
	};
	const handleDialogSaveAndClose = (newMeet: Meet) => {
		let time = new Date();
		let newMeetings = [
			...meetings,
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
	const editMeet = (uid: number, Meetings: Meet[]) => {
		setNewMeet(Meetings.filter((meet) => meet.uid === uid)[0]);
		setDialogOpen(true);
		let newMeetings = Meetings.filter((meet) => meet.uid !== uid);
		setMeetings(newMeetings);
		saveData(newMeetings);
	};

	const handleDialogOpen = () => {
		setNewMeet({ name: "", description: "", url: "", uid: 0 });
		setDialogOpen(true);
	};

	const [meetings, setMeetings] = useState<Meet[]>(getData());

	return (
		<ThemeProvider theme={theme}>
			<Box mb={6} pb={6}>
				<Grid container spacing={3} direction='row' justify='center' alignItems='center'>
					{meetings.map((meeting) => {
						return (
							<Grid key={meeting.uid} item xs={12} sm={12} md={6}>
								<Box>
									<Card elevation={2}>
										<CardHeader
											title={meeting.name}
											action={
												<span>
													<IconButton
														style={{ color: red[500] }}
														onClick={() => deleteMeet(meeting.uid, meetings)}
														aria-label='meeting options'>
														<DeleteSharp />
													</IconButton>

													<IconButton
														style={{ color: blue[500] }}
														onClick={() => editMeet(meeting.uid, meetings)}
														aria-label='meeting options'>
														<EditSharp />
													</IconButton>
												</span>
											}
										/>
										<CardContent>
											<Typography variant='body1'>{meeting.description}</Typography>
											<Typography variant='h6'>
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
				</Grid>
			</Box>

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
				<NewMeetingDialogContents
					handleDialogClose={handleDialogClose}
					handleDialogSaveAndClose={handleDialogSaveAndClose}
					newMeet={newMeet}
					setnewMeet={setNewMeet}
				/>
			</Dialog>
		</ThemeProvider>
	);
}
