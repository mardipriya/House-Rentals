import * as React from 'react';

import Sidebar from './Sidebar';
import {Paper, Button, TextField } from '@mui/material'
import Carousel from './Carousel';
import LinearProgress from '@mui/joy/LinearProgress';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import data from './../components-data/ApartmentData'

function ViewApartment(){


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar"/>
            <div className="dflex jc-around" style={ styles.mainContent}>
                <Paper elevation={5} sx={{width : "80%", padding : "32px"}}>
                    <Carousel images={data.images}/>
                    <h2>Apartment {data.apartmentNumber}</h2>
                    <p>Location: {data.address.city}, {data.address.state}</p>
                    <p>Price: $ {data.pricePerMonth}/month</p>
                    <p>Bedrooms: {data.bedrooms} | Bathrooms: {data.bathrooms}</p>
                    <p>Description: {data.description}</p>

                    <p> Address : {data.apartmentNumber}-{data.flatNumber} , <br/> {data.address.lane}, <br/> 
                     {data.address.city}, {data.address.state} <br/>
                     {data.address.zip}
                    </p>
                    <p> Owner Name : {data.ownerName} </p>
                    <p> Owner Contact : {data.ownerContact}</p>
                    <div className="w100 tcenter dflex jc-around">
                        <Button variant="outlined" onClick={handleClickOpen}> Apply Now !</Button>
                         
                            <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                            component: 'form',
                            onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                console.log(formJson);
                                alert("Application Submitted Successfully !");
                                const name = formJson.fullname;
                                const email = formJson.email;
                                const income = formJson.income;
                                const people = formJson.people;
                                const currentAddr = formJson["current-addr"];
                                const applicationDate = new Date();
                                const status = "Reported";
                                //API
                                handleClose();
                            },
                            }}
                            >
                            <DialogTitle>Enter Your Details</DialogTitle>
                            <DialogContent>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="full-name"
                                name="fullname"
                                label="Full Name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="email"
                                name="email"
                                label="Email"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="income-amount"
                                name="income"
                                label="Income"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                             <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="no-of-people"
                                name="people"
                                label="No. of People"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="current-addr"
                                name="current-addr"
                                label="Current Address"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit"> Submit </Button>
                            </DialogActions>
                        </Dialog>

                    </div>
                </Paper>
            </div>
        </div>
    )
}

const styles = {
    mainContent : {
        flex : 1,
        marginLeft : '200px',
        padding : '30px'
    }
}

export default ViewApartment;