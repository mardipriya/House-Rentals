import * as React from 'react';
import Sidebar from './Sidebar';
import { Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@mui/material';

function AdminPayments() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedPayment, setSelectedPayment] = React.useState(null);
    const [transactionDetails, setTransactionDetails] = React.useState('');
    const [paymentStatus, setPaymentStatus] = React.useState('');
    const [filterUser, setFilterUser] = React.useState('');

    // Sample payments data, replace this with your actual data
    const payments = [
        {
            id: 1,
            description: "Advance",
            amount: 1000,
            status: "Paid",
            transactionDetails: "TX00232N12",
            user: "User 1"
        },
        {
            id: 2,
            description: "Cleaning Fee",
            amount: 120,
            status: "Paid",
            transactionDetails: "TX20232N12",
            user: "User 2"
        },
        // Add more payment objects as needed
    ];

    // Extract unique user names
    const users = Array.from(new Set(payments.map(payment => payment.user)));

    const handleOpenDialog = (payment) => {
        setSelectedPayment(payment);
        setOpenDialog(true);
        setPaymentStatus(payment.status);
        setTransactionDetails(payment.transactionDetails);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleUpdateTransactionDetails = (event) => {
        setTransactionDetails(event.target.value);
    };

    const handlePaymentStatusChange = (event) => {
        setPaymentStatus(event.target.checked ? "Paid" : "Unpaid");
    };

    const handleSaveTransactionDetails = () => {
        // Here you would save the transaction details and status to the backend
        // For demonstration purposes, let's just log them
        console.log("Updated transaction details:", transactionDetails);
        console.log("Updated payment status:", paymentStatus);
        handleCloseDialog();
    };

    const handleUserFilterChange = (event) => {
        setFilterUser(event.target.value);
    };

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Admin" />
            <div className="dflex jc-around" style={styles.mainContent}>
                <Paper elevation={5} sx={{ width: "80%", padding: "32px" }}>
                    <h2>Admin Payments</h2>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>User</InputLabel>
                        <Select
                            value={filterUser}
                            onChange={handleUserFilterChange}
                        >
                            <MenuItem value="">All Users</MenuItem>
                            {users.map((user, index) => (
                                <MenuItem key={index} value={user}>{user}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Transaction Details</TableCell>
                                    <TableCell align="right">User</TableCell>
                                    {/* <TableCell align="right">Actions</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payments.filter(payment => !filterUser || payment.user === filterUser).map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>{payment.description}</TableCell>
                                        <TableCell align="right">${payment.amount}</TableCell>
                                        <TableCell align="right">{payment.status}</TableCell>
                                        <TableCell align="right">{payment.transactionDetails}</TableCell>
                                        <TableCell align="right">{payment.user}</TableCell>
                                        {/* <TableCell align="right">
                                            <Button onClick={() => handleOpenDialog(payment)}>Update</Button>
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Update Payment Details</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="transactionDetails"
                                label="Transaction Details"
                                type="text"
                                fullWidth
                                value={transactionDetails}
                                onChange={handleUpdateTransactionDetails}
                            />
                            <FormControlLabel
                                control={<Switch checked={paymentStatus === 'Paid'} onChange={handlePaymentStatusChange} />}
                                label={paymentStatus === 'Paid' ? 'Paid' : 'Unpaid'}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={handleSaveTransactionDetails} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </div>
        </div>
    );
}

const styles = {
    mainContent: {
        flex: 1,
        marginLeft: '200px',
        padding: '30px'
    }
};

export default AdminPayments;