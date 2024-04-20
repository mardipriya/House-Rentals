import {Paper, Button } from '@mui/material'
import * as React from 'react';
import Sidebar from './Sidebar';
import Carousel from './Carousel';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody,  Select, MenuItem} from '@mui/material';


function UpdateStatus(){
    const columns = [
        "Apartment Number", "Flat Number", "Current Status", "Applied By"
    ]
    const data = [
        {
            "Apartment Number" : 4030, 
            "Flat Number" : 112,
            "Current Status" : "Approved",
            "Applied By" : "User 1"
        },
        {
            "Apartment Number" : 4030, 
            "Flat Number" : 212,
            "Current Status" : "Partially Approved",
            "Applied By" : "User 2"
        },
        {
            "Apartment Number" : 4030, 
            "Flat Number" : 312,
            "Current Status" : "Approved",
            "Applied By" : "User 3"
        },
        {
            "Apartment Number" : 4030, 
            "Flat Number" : 102,
            "Current Status" : "Verified",
            "Applied By" : "User 4"
        },{
            "Apartment Number" : 4040, 
            "Flat Number" : 112,
            "Current Status" : "Rejected",
            "Applied By" : "User 5"
        },
    ]

    const [updatedData, setUpdatedData] = React.useState(data);
    React. useEffect(() => {
        // This will execute whenever updatedData changes
        console.log("Updated data:", updatedData);
      }, [updatedData]); 

      const [openDialog, setOpenDialog] = React.useState(false);
      const [selectedUser, setSelectedUser] = React.useState(null);
      
      const handleClickUser = (user) => {
          setSelectedUser(user);
          setOpenDialog(true);
      };
      
      const handleCloseDialog = () => {
          setOpenDialog(false);
      };

    const handleChangeStatus = (event, index) => {
        const updatedStatus = event.target.value;
        const newData = [...updatedData]; // Create a copy of updatedData
        newData[index] = { ...newData[index], "Current Status": updatedStatus }; // Update the status of the specific row
        setUpdatedData(newData); // Update the state
      };

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar"/>
            <div className="dflex jc-around" style={ styles.mainContent}>
                <Paper elevation={5} sx={{width : "80%", padding : "32px"}}>
                    <h2> Current Lease Statuses </h2>
                    <Table>
                    <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                        <TableCell key={index}>{column}</TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {updatedData.map((row, index) => (
                        <TableRow key={index}>
                        {columns.map((column, columnIndex) => (
                            <TableCell sx={{fontWeight: "bold"}} key={columnIndex}>
                            {column === "Current Status" ? (
                              <Select
                                value={row[column]}
                                onChange={(event) => handleChangeStatus(event, index)}
                              >
                                <MenuItem value="Applied">Applied</MenuItem>
                                <MenuItem value="Under Review">Under Review</MenuItem>
                                <MenuItem value="Partially Approved">Partially Approved</MenuItem>
                                <MenuItem value="Verified">Verified</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                                <MenuItem value="Rejected">Declined</MenuItem>
                              </Select>
                            ) : ( column === "Applied By" ? <a onClick={() => handleClickUser(row["Applied By"])} href="#"> {row[column]} </a>: row[column])}
                          </TableCell>
                        ))}
                        </TableRow>
                    ))}
                    </TableBody>
                    <Dialog sx={{ width : "100%"}} open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogContent>
                            {selectedUser && (
                                <div>
                                    <p><strong>User Name:</strong> {selectedUser}</p>
                                    {/* Add more user details here if needed */}
                                </div>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Table>
                </Paper>
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

export default UpdateStatus;