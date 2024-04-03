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


function Status(){

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Hrithik M"/>
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
                            data.currentComplaints.push({
                                complaintNumber : "133",
                                complaintTitle : title,
                                complaintStatus : desc,
                                complaintDateTime : String(dateTime),
                                complaintDescription : status
                            })
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
                
                    { data.currentComplaints.map( (object,index)=>(
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
                            <p> Issue Raised : {object.complaintDateTime} </p>

                        </AccordionDetails>
                      </Accordion>
                    )) 
                    }
                <h2> Previous Complaints : </h2>
                { data.previousComplaints.map( (object,index)=>(
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
                            <p> Issue Raised : {object.complaintDateTime}  </p>
                            <p> Issue Solved : {object.complaintSolvedDateTime} </p>
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