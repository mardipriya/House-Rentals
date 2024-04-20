import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

const containerStyle = {
    width: "100%",
    marginTop: "80px"
};

const newAptBtn = {
    width : "100%",
    display : "flex",
    justifyContent : "space-around"
}

function LeaseOptions(props) {

    const fromPage = "Admin";

    const [openDialog, setOpenDialog] = useState(false);
    const [currentApartment, setCurrentApartment] = useState(null);
    const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
    const [apartments, setApartments] = useState(props.arr);

    const handleOpenDialog = (apartment, mode) => {
        setDialogMode(mode);
        setCurrentApartment(apartment);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentApartment(null);
    };

    const handleDelete = (apartmentId) => {
        const updatedList = apartments.filter(apartment => apartment.id !== apartmentId);
        setApartments(updatedList);
        // Optionally, perform API call to delete
        alert("Deleted apartment with ID:", apartmentId);
    };

    const handleApply = ()=>{
        if( props.fromPage === "Main"){
            window.location.href = '/login';
        }
        else{
            window.location.href = '/apartment'
        }
    }

    const handleSave = (apartmentData, mode) => {
        if (mode === 'add') {
            setApartments([apartmentData, ...apartments]); // Prepend new apartment
        } else {
            const updatedApartments = apartments.map(apartment =>
                apartment.id === apartmentData.id ? apartmentData : apartment
            );
            setApartments(updatedApartments);
        }
        handleCloseDialog();
    };

    return (
        <div style={containerStyle}>
            <h1 className="tcenter">AVAILABLE FLOOR PLANS</h1>
            {fromPage === "Admin" && (
                <div style={newAptBtn}>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog({}, 'add')}>
                        + New Apartment
                    </Button>
                </div>
            )}
            <div className="dflex jc-around ai-center fwrap">
                {apartments.map((object, i) => (
                    <Paper key={i} elevation={5} sx={{ position: 'relative', display: "flex", flexDirection: "column", textAlign: 'left', margin: '32px', padding: "48px" }}>
                        {fromPage === "Admin" && (
                            <>
                                <Button style={{ position: 'absolute', top: '10px', left: '10px' }} onClick={() => handleDelete(object.id)}>×</Button>
                                <Button style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => handleOpenDialog(object, 'edit')}>Edit</Button>
                            </>
                        )}
                        <div className="w100 dflex jc-around">
                            <img src={require('./../images/' + object['image'])} width="160px" height="160px" alt="Apartment"></img>
                        </div>
                        <p>Apartment Number: {object['apt-number']}</p>
                        <p>Flat Number: {object['flat-number']}</p>
                        <p>Bedrooms: {object['bedrooms']}</p>
                        <p>Available From: {object['avail-from']}</p>
                        <Button style={{ marginBottom: "10px" }} variant="outlined" onClick={handleApply}>Apply Now!</Button>
                        <Button variant="outlined"><a href={"mailto:mandhahrithik@gmail.com?subject=Apartment%20Enquiry&body=Hi%20Team%20I%20want%20to%20know%20about%20Apartment%20" + object['apt-number'] + "%20" + object['flat-number']}>Contact Us</a></Button>
                    </Paper>
                ))}
            </div>
            <ApartmentDialog open={openDialog} mode={dialogMode} apartment={currentApartment} onClose={handleCloseDialog} onSave={handleSave} />
</div>
);
}

export default LeaseOptions;

function ApartmentDialog({ open, onClose, onSave, apartment, mode }) {
    const [formData, setFormData] = useState({ ...apartment });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        onSave(formData, mode);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{mode === 'add' ? 'Add New Apartment' : 'Edit Apartment Details'}</DialogTitle>
            <DialogContent>
                <TextField label="Apartment Number" name="apt-number" value={formData['apt-number'] || ''} onChange={handleChange} fullWidth />
                <TextField label="Flat Number" name="flat-number" value={formData['flat-number'] || ''} onChange={handleChange} fullWidth />
                <TextField label="Bedrooms" name="bedrooms" value={formData['bedrooms'] || ''} onChange={handleChange} fullWidth />
                <TextField label="Available From" name="avail-from" value={formData['avail-from'] || ''} onChange={handleChange} fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}