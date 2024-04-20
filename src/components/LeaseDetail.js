import { Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

import Sidebar from './Sidebar';
import Carousel from './Carousel';

import data from './../components-data/ApartmentData';

function LeaseDetail() {
    const lMembers = ["Hrithik Manda", "Abc", "Def", "Ghi", "Kjl"];
    const [leaseMembers, setLeaseMembers] = useState(lMembers);
    const [newMember, setNewMember] = useState('');

    const handleAddMember = () => {
        if (newMember && !leaseMembers.includes(newMember)) {
            setLeaseMembers([...leaseMembers, newMember]);
            alert(`${newMember} has been added to the lease.`)
            setNewMember('');
        } else {
            alert("Please select a valid member");
        }
    };

    const handleRemoveMember = (member) => {
        const updatedMembers = leaseMembers.filter((m) => m !== member);
        setLeaseMembers(updatedMembers);
        alert(`${member} has been removed from the lease.`)
    };

    const handleChange = (event) => {
        setNewMember(event.target.value);
    };

    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar"/>
            <div className="dflex jc-around" style={styles.mainContent}>
                <Paper elevation={5} sx={{ width: "80%", padding: "32px" }}>
                    <Carousel images={data.images} />
                    <h4> Your Lease Details : </h4>
                    <p> Apartment Number: {data.apartmentNumber} </p>
                    <p> Flat Number: {data.flatNumber} </p>
                    <p> Lease Start Date: 10-20-2022</p>
                    <p> Lease End Date: 10-20-2024</p>
                    <div className="dflex">
                        <p>Current Lease Members: </p>
                    </div>
                    <div className="dflex ai-center jc-between">
                        <FormControl sx={{width : "85%"}}>
                            <InputLabel id="add-member-label">Add Member</InputLabel>
                            <Select
                                labelId="add-member-label"
                                id="add-member"
                                value={newMember}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Select Member</MenuItem>
                                <MenuItem value="Hrithik">Hrithik</MenuItem>
                                <MenuItem value="ABc">ABc</MenuItem>
                                <MenuItem value="DEF">DEF</MenuItem>
                                <MenuItem value="GHI">GHI</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleAddMember}>Add Member</Button>
                    </div>
                    <ol>
                        {leaseMembers.map((member, index) => (
                            <li key={index} >
                                <span style={{marginRight : "32px"}}>
                                    {member} 
                                </span>
                                <a href="#" onClick={() => handleRemoveMember(member)}>Remove</a>
                            </li>
                        ))}
                    </ol>
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

export default LeaseDetail;