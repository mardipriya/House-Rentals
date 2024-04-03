import {Paper, Button } from '@mui/material'

import Sidebar from './Sidebar';
import Carousel from './Carousel';

import data from './../components-data/ApartmentData';

function FixComplaints(){
    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar"/>
            <div className="dflex jc-around" style={ styles.mainContent}>
                <Paper elevation={5} sx={{width : "80%", padding : "32px"}}>
                    <h3> List of Complaints needed to be fixed by admins</h3>
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

export default FixComplaints;