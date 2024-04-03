import Sidebar from './Sidebar';
import {Paper, Button } from '@mui/material'
import LinearProgress from '@mui/joy/LinearProgress';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Payments(){
    
    const hasApplied = true;

    const payments = {
        Advance: [1000, "Paid"],
        CarParking: [50, "Paid"],
        CleaningFee: [120, "Paid"],
        WaterBill: [30, "Not Paid"],
        ElectricityBill: [30, "Not Paid"],
        MaintenanceFee: [80, "Paid"],
        // Add more payment types as needed
    };

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar"/>
            <div className="dflex jc-around" style={ styles.mainContent}>
                <Paper elevation={5} sx={{width : "80%", padding : "32px"}}>
                    { !hasApplied  ? 
                        <div className="w100 tcenter">
                            <h3> You have not applied to any Apartments.  </h3>
                        </div>

                        : 
                        //Conditional Rendering
                        <div>
                        <h2>Lease Payments</h2>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650}} aria-label="lease payments table">
                            <TableHead >
                            <TableRow>
                                <TableCell  sx={{fontWeight : "bold"}}>Description</TableCell>
                                <TableCell  sx={{fontWeight : "bold"}} align="right">Amount</TableCell>
                                <TableCell  sx={{fontWeight : "bold"}} align="right">Status</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {/* Render advance payment */}
                            {Object.entries(payments).map(([paymentType, amount]) => { 
                                return (
                                    <TableRow key={paymentType}>
                                        <TableCell component="th" scope="row">{paymentType}</TableCell>
                                        <TableCell align="right">${amount[0]}</TableCell>
                                        <TableCell sx={{color : amount[1]=="Paid"? "green" : "red", fontWeight : "bold"}} align="right">{amount[1]}</TableCell>
                                    </TableRow>
                                );
                            })}
                            </TableBody>
                            </Table>
                            </TableContainer>
                        </div>
                    }
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

export default Payments;