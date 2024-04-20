import * as React from 'react';
import Sidebar from './Sidebar';
import { Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Payments() {
    const hasApplied = true;
    const [open, setOpen] = React.useState(false);
    const [paymentType, setPaymentType] = React.useState('');
    const [accountNumber, setAccountNumber] = React.useState('');
    const [routingNumber, setRoutingNumber] = React.useState('');

    const payments = {
        Advance: [1000, "Paid", "TX00232N12"],
        CarParking: [50, "Paid", "TX00232N82"],
        CleaningFee: [120, "Paid", "TX20232N12"],
        WaterBill: [30, "Not Paid", "-"],
        ElectricityBill: [30, "Not Paid", "-"],
        MaintenanceFee: [80, "Paid", "TX03232N12"],
        // Add more payment types as needed
    };

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
        const updatedPayments = { ...payments };
        updatedPayments[paymentType][2] = `TX${randomTransaction}`;
        alert(`Payment for ${paymentType} has been made successfully. Transaction ID: TX${randomTransaction}`);
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
                                        {Object.entries(payments).map(([paymentType, details]) => {
                                            return (
                                                <TableRow key={paymentType}>
                                                    <TableCell component="th" scope="row">{paymentType}</TableCell>
                                                    <TableCell align="right">${details[0]}</TableCell>
                                                    <TableCell sx={{ color: details[1] === "Paid" ? "green" : "red", fontWeight: "bold" }} align="right">{details[1] === "Paid" ? details[1] : <a href='#' onClick={() => handleClickOpen(paymentType)}>Pay Now</a>}</TableCell>
                                                    <TableCell align="right">{details[2]}</TableCell>
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