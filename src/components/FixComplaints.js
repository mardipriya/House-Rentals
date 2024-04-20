import * as React from 'react';
import Sidebar from './Sidebar';
import data from './../components-data/ComplaintsData';

import Accordion from '@mui/material/Accordion';
import Button from '@mui/material/Button';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { updateComplaints, fetchComplaints } from './ServerRequests.js';

function FixComplaints() {

    //TODO : 
    // const response = fetchComplaints();

    const response = { statusCode : 300,
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



    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedComplaint, setSelectedComplaint] = React.useState(null);
    const [comment, setComment] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [estimatedDate, setEstimatedDate] = React.useState('');

    const handleOpenDialog = (complaint) => {
        setSelectedComplaint(complaint);
        setOpenDialog(true);
        setComment(complaint.commentFromOwner);
        setStatus(complaint.complaintStatus);
        setEstimatedDate(complaint.estimatedDate || '');
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleEstimatedDateChange = (event) => {
        setEstimatedDate(event.target.value);
    };

    const handleSaveChanges = () => {
        // Update comment, status, and estimated date for the selected complaint
        const updatedComplaints = data.map(complaint => {
            if (complaint.complaintId === selectedComplaint.complaintId) {
                return {
                    ...complaint,
                    "commentFromOwner" : comment,
                    "complaintStatus" : status,
                    "expectedDateToSolve" : estimatedDate
                };
            }
            return complaint;
        });

        const payload = {
            expectedDateToSolve: estimatedDate,
            complaintStatus: status,
            commentFromOwner: comment
        }; 
        // TODO:       
        // const response = updateComplaints( selectedComplaint.complaintId, payload );
        // if ( response.status !== 200){
        //     alert('There was an error updating the complaint status. Please try again later.');
        //     return;
        // }
        // else{
        //     alert('Updated the complaint status successfully.');
        // }

        setData(updatedComplaints);
        handleCloseDialog();
    };

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Admin" />
            <div style={styles.mainContent}>
                <h2>Fix Complaints</h2>
                <div>
                    <h3>Open Complaints : </h3>
                    { data.filter(complaint => complaint.complaintStatus !== 'Resolved').map((complaint, index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h4>{complaint.complaintTitle}</h4>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <p>Description: {complaint.complaintDescription}</p>
                                    <p>Status: {complaint.complaintStatus}</p>
                                    <p>Issue Raised: {complaint.raisedTime}</p>
                                    <p> Raised By : { complaint.raisedByName } {complaint.raisedByEmail}</p>
                                    <Button onClick={() => handleOpenDialog(complaint)}>Edit</Button>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
                <div>
                    <h3>Closed Complaints : </h3>
                    {data.filter(complaint => complaint.complaintStatus === 'Resolved').map((complaint, index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <h4>{complaint.complaintTitle}</h4>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <p>Description: {complaint.complaintDescription}</p>
                                    <p>Status: {complaint.complaintStatus}</p>
                                    <p>Issue Raised: {complaint.raisedTime}</p>
                                    <p>Issue Solved: {complaint.expectedDateToSolve}</p>
                                    <p>Comment: {complaint.commentFromOwner}</p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Edit Complaint</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit the comment, status, and estimated date for the complaint.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="comment"
                            label="Comment"
                            type="text"
                            fullWidth
                            value={comment}
                            onChange={handleCommentChange}
                        />
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={handleStatusChange}
                            >
                                <MenuItem value="Reported">Reported</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Resolved">Resolved</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="estimatedDate"
                            label="Estimated Date to Solve"
                            type="date"
                            fullWidth
                            value={estimatedDate}
                            onChange={handleEstimatedDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

const styles = {
    mainContent: {
        flex: 1,
        marginLeft: '200px',
        padding: '32px'
    }
};

export default FixComplaints;
