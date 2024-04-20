import * as React from 'react';
import { Paper, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Link, Menu, MenuItem } from '@mui/material';
import Sidebar from './Sidebar';
import data from './../components-data/ApartmentData';

function GivenLeases() {
    const currentLeases = [
        {
          apartmentNumber: 101,
          flatNumber: 1,
          userDetails: "John Doe"
        },
        {
          apartmentNumber: 102,
          flatNumber: 2,
          userDetails: "Jane Smith"
        },
        {
          apartmentNumber: 103,
          flatNumber: 3,
          userDetails: "Michael Johnson"
        }
      ];
    
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

    const handleTransferLease = () => {
        // Implement lease transfer logic here
        console.log("Lease transferred:", selectedLease);
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
                                    <TableCell>User Details</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentLeases.map((lease, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{lease.apartmentNumber}</TableCell>
                                        <TableCell>{lease.flatNumber}</TableCell>
                                        <TableCell>
                                            <Link href="#">{lease.userDetails}</Link>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={(event) => handleMenuOpen(event, lease)}>Options</Button>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={handleTerminateLease}>Terminate Lease</MenuItem>
                                                <MenuItem onClick={handleTransferLease}>Transfer Lease</MenuItem>
                                            </Menu>
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
