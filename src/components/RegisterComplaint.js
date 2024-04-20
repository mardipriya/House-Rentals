import * as React from 'react';

import Sidebar from './Sidebar';
import data from './../components-data/ComplaintsData'

import Accordion from '@mui/material/Accordion';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { addComplaint, fetchUserComplaints} from './ServerRequests'; 


function Status(){

    //TODO:
    // const response = fetchUserComplaints();

    const response = { status : 300,
        complaints :  [
            {
                "complaintId": "121",
                "complaintTitle": "Wifi Connection Not Working",
                "complaintStatus": "Reported",
                "raisedTime": "2024-12-08 00:08:00",
                "complaintDescription": "Wifi Connection Not working after fee payment",
                "expectedDateToSolve": "2024-12-09 03:04:00",
                "commentFromOwner": "Please wait while we check on this",
                "raisedByName" : "ABC",
                "raisedByEmail" : "abc@gmail.com"
            },
            {
                "complaintId": "122",
                "complaintTitle": "Leaky Faucet in Bathroom",
                "complaintStatus": "In Progress",
                "raisedTime": "2024-12-07 11:15:00",
                "complaintDescription": "The faucet in the main bathroom is leaking and causing water wastage.",
                "expectedDateToSolve": "2024-12-10 12:00:00",
                "commentFromOwner": "A plumber has been scheduled for the visit.",
                "raisedByName" : "ABC",
                "raisedByEmail" : "abc@gmail.com"
            },
            {
                "complaintId": "123",
                "complaintTitle": "Broken Window Lock",
                "complaintStatus": "Resolved",
                "raisedTime": "2024-12-05 16:42:00",
                "complaintDescription": "The lock on the window in the living room is broken and won’t close properly.",
                "expectedDateToSolve": "2024-12-06 18:00:00",
                "commentFromOwner": "The lock has been replaced successfully.",
                "raisedByName" : "ABC",
                "raisedByEmail" : "abc@gmail.com"
            },
            {
                "complaintId": "125",
                "complaintTitle": "Pest Control Required",
                "complaintStatus": "Reported",
                "raisedTime": "2024-12-07 19:35:00",
                "complaintDescription": "Signs of pest infestation in the kitchen need urgent pest control.",
                "expectedDateToSolve": "2024-12-14 17:30:00",
                "commentFromOwner": "Pest control service has been informed and will visit soon.",
                "raisedByName" : "ABC",
                "raisedByEmail" : "abc@gmail.com"
            }
        ]
    }

    const [data, setData] = React.useState(response.complaints);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewComplaint = ( payload ) => {
        var copy = data;
        copy.complaints.push(payload);
        setData(copy);

        //TODO : 
        // const response = addComplaint( userId, payload);
        // if( response.status === 200 ){
        //     setData( response.data.complaints );
        // }
    }

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar"/>
            <div style={ styles.mainContent}>
                <div className="w100 dflex jc-around tcenter">
                    <Button onClick={handleClickOpen} variant="outlined"> + Create a New Complaint </Button>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const title = formJson.title;
                            const desc = formJson.description;
                            const dateTime = new Date();
                            const status = "Reported";
                            const payload = {
                                complaintNumber : "133",
                                complaintTitle : title,
                                complaintStatus : status,
                                raisedTime : String(dateTime),
                                complaintDescription : desc
                            };
                            handleNewComplaint(payload);
                            console.log(data);
                            handleClose();
                        },
                        }}
                    >
                        <DialogTitle>New Complaint</DialogTitle>
                        <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="complaint-title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="complaint-desc"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                            rows={4}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit"> Submit </Button>
                        </DialogActions>
                    </Dialog>

                </div>
                <h2>
                    Current Complaints :
                </h2>
                
                    { data.filter(object => object.complaintStatus !== 'Resolved').map( (object,index)=>(
                        <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                            >
                           <h3> { object.complaintTitle} </h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            
                            Description : { object.complaintDescription}
                            <p> Status : {object.complaintStatus}</p>
                            <p> Issue Raised : {object.raisedTime} </p>

                        </AccordionDetails>
                      </Accordion>
                    )) 
                    }
                <h2> Previous Complaints : </h2>
                { data.filter(object => object.complaintStatus === "Resolved").map( (object,index)=>(
                        <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                            >
                           <h3> { object.complaintTitle} </h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            
                            Description : { object.complaintDescription}
                            <p> Status : {object.complaintStatus}</p>
                            <p> Issue Raised : {object.raisedTime}  </p>
                            <p> Issue Solved : {object.expectedDateToSolve} </p>
                            <p> Comment : {object.commentFromOwner}</p>
                        </AccordionDetails>
                      </Accordion>
                    )) 
                    }
            </div>
        </div>
    )
}

const styles = {
    mainContent : {
        flex : 1,
        marginLeft : '200px',
        padding : '32px'
    }
}

export default Status;