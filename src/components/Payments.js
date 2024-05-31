import * as React from 'react';
import Sidebar from './Sidebar';
import { Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { getAllUserPayments } from './ServerRequests';

function Payments() {
    const hasApplied = true;
    const [payments, setPayments] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [paymentType, setPaymentType] = React.useState('');
    const [accountNumber, setAccountNumber] = React.useState('');
    const [routingNumber, setRoutingNumber] = React.useState('');

    React.useEffect(() => {
        const userId = localStorage.getItem('userId'); 
        getAllUserPayments(userId).then(data => {
            setPayments(data.payments);
        }).catch(error => console.error('Failed to fetch payments:', error));
    }, []);

    const handleClickOpen = (paymentType) => {
        setOpen(true);
        setPaymentType(paymentType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'accountNumber') {
            setAccountNumber(value);
        } else if (name === 'routingNumber') {
            setRoutingNumber(value);
        }
    };

    const handlePay = () => {
        // Here you would make the payment and update the transaction details
        const randomTransaction = Math.floor(1000 + Math.random() * 9000); // Generate a random transaction ID
        var updatedPayments = [ ...payments ];
        console.log(paymentType)
        for( var i = 0 ; i< payments.length ; i++){
            console.log(updatedPayments[i]._id +" "+paymentType);
            if (payments[i]._id === paymentType) {
                console.log('Found payment');
                console.log(updatedPayments[i]);
                updatedPayments[i].transactionId = `TX${randomTransaction}`;
                updatedPayments[i].status = "Paid";
                setPayments(updatedPayments); // Update the payments state with the new transactionId
                alert(`Payment for ${paymentType} has been made successfully. Transaction ID: TX${randomTransaction}`);
            } 
        }
        setOpen(false);
    };

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar" />
            <div className="dflex jc-around" style={styles.mainContent}>
                <Paper elevation={5} sx={{ width: "80%", padding: "32px" }}>
                    {!hasApplied ?
                        <div className="w100 tcenter">
                            <h3> You have not applied to any Apartments. </h3>
                        </div>
                        :
                        //Conditional Rendering
                        <div>
                            <h2>Lease Payments</h2>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="lease payments table">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="right">Amount</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="right">Status</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="right">Transaction Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Render advance payment */}
                                        {payments && Object.entries(payments).map(([key, payment]) => {
                                            return (
                                                <TableRow key={key}>
                                                    <TableCell component="th" scope="row">{payment.description}</TableCell>
                                                    <TableCell align="right">${payment.amount}</TableCell>
                                                    <TableCell sx={{ color: payment.status === "Paid" ? "green" : "red", fontWeight: "bold" }} align="right">
                                                        {payment.status === "Paid" ? payment.status : <a href="#" onClick={() => handleClickOpen(payment._id)}>Pay Now</a>}
                                                    </TableCell>
                                                    <TableCell align="right">{payment.transactionId.toUpperCase()}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Payment Details</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="accountNumber"
                                        name="accountNumber"
                                        label="Bank Account Number"
                                        type="text"
                                        fullWidth
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="routingNumber"
                                        name="routingNumber"
                                        label="Routing Number"
                                        type="text"
                                        fullWidth
                                        onChange={handleInputChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handlePay} disabled={!accountNumber || !routingNumber} color="primary">Pay</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    }
                </Paper>
            </div>
        </div>
    )
}

const styles = {
    mainContent: {
        flex: 1,
        marginLeft: '200px',
        padding: '30px'
    }
}

export default Payments;