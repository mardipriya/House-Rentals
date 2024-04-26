import * as React from 'react';
import { Paper, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Link, Menu, MenuItem } from '@mui/material';
import Sidebar from './Sidebar';
import data from './../components-data/ApartmentData';

import { fetchAllLeases } from './ServerRequests';

function GivenLeases() {
    const [leases, setLeases] = React.useState([]);

    React.useEffect(() => {
        fetchAllLeases().then(data => {
            setLeases(data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedLease, setSelectedLease] = React.useState(null);

    const handleMenuOpen = (event, lease) => {
        setAnchorEl(event.currentTarget);
        setSelectedLease(lease);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleTerminateLease = () => {
        // Implement termination logic here
        console.log("Lease terminated:", selectedLease);
        handleMenuClose();
    };

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar" />
            <div className="dflex jc-around" style={styles.mainContent}>
                <Paper elevation={5} sx={{ width: "80%", padding: "32px" }}>
                    <h3>List of Current Leases</h3>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Apartment Number</TableCell>
                                    <TableCell>Flat Number</TableCell>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>User Contact</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leases.map((lease, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{lease.apartmentDetails.apartmentNumber}</TableCell>
                                        <TableCell>{lease.apartmentDetails.flatNumber}</TableCell>
                                        <TableCell>
                                            {lease.User.firstName}
                                        </TableCell>
                                        <TableCell>
                                            {lease.User.email}
                                        </TableCell>
                                        <TableCell>
                                            
                                                <Button onClick={handleTerminateLease}>Terminate Lease</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
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

export default GivenLeases;
