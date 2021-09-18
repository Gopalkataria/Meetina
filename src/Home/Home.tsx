// the home page with all the meetings
// meeting can be edited , removed here itself ,

// links to all main pages here in app menu





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
const URL_REGEX = /[a-zA-Z]{3}-?[a-zA-Z]{4}-?[a-zA-Z]{3}/ ; 


function NewMeetingDialogContents(props: {
  handleDialogClose: { (): void };
  handleDialogSaveAndClose: { (newMeet: Meet): void };
  newMeet: Meet;
  setNewMeet: { (meet: Meet): void };
  editMode: boolean;
}) {


	const [newMeet, setNewMeet] = useState<Meet>(
    Object.assign({}, props.newMeet)
  );

  return (
		<div>
			<DialogContent>
				<TextField
					onBlur={(evt) => {
            setNewMeet({ ...newMeet , name: evt.target.value }) ;
					}}
					autoFocus
					label='Meeting Name'
					fullWidth
					type='text'
					inputProps={{ defaultValue: props.newMeet.name }}
				/>
				<TextField
					onBlur={(evt) => {
            setNewMeet( { ...newMeet, description :  evt.target.value });
					}}
					multiline
					label='Meeting Description (optional)'
					fullWidth
					type='text'
					inputProps={{ defaultValue: props.newMeet.description }}
				/>

				<TextField
          onChange={(evt) => {

						setNewMeet({ ...newMeet, url: evt.target.value });
					}}
					error={!URL_REGEX.test(newMeet.url) && newMeet.url !== ""}
					label='Meeting URL'
					fullWidth
					type='url'
					inputProps={{ defaultValue: props.newMeet.url }}
				/>
			</DialogContent>

			<DialogActions>
				<Button
					onClick={
						props.editMode
							? () => {
									props.handleDialogSaveAndClose(props.newMeet);
							  }
							: props.handleDialogClose
					}>
					Cancel
				</Button>

				<Button
					disabled={newMeet.url === ""}
					variant='contained'
					color='secondary'
					onClick={() => {

						props.handleDialogSaveAndClose(newMeet);
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
  const [editMode, setEditMode] = useState(false);
  const [newMeet, setNewMeet] = useState<Meet>({
    name: "",
    url: "",
    description: "",
    uid: 0,
  });

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditMode(false);
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
    setEditMode(true);
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
														style={{ color: red[600] }}
														onClick={() => deleteMeet(meeting.uid, meetings)}
														aria-label='meeting options'>
                            <DeleteSharp />
                            {/*  todo add delete warning  */}
													</IconButton>

													<IconButton
														style={{ color: blue[600] }}
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
												<Link
													href={"https://meet.google.com/" + meeting.url}
													target='_blank'
													color='primary'>
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
				<DialogTitle id='new-meeting-dialog'>Add or Edit Meeting</DialogTitle>
				<NewMeetingDialogContents
					handleDialogClose={handleDialogClose}
					handleDialogSaveAndClose={handleDialogSaveAndClose}
					newMeet={newMeet}
					setNewMeet={setNewMeet}
					editMode={editMode}
				/>
			</Dialog>
		</ThemeProvider>
	);
}
