import {Paper, Button } from '@mui/material'

import Sidebar from './Sidebar';
import Carousel from './Carousel';

import data from './../components-data/ApartmentData';

function LeaseDetail(){
    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar"/>
            <div className="dflex jc-around" style={ styles.mainContent}>
                <Paper elevation={5} sx={{width : "80%", padding : "32px"}}>
                    <Carousel images={data.images}/>
                    <h4> Your Lease Details : </h4>
                    <p> Apartment Number : {data.apartmentNumber} </p>
                    <p> Flat Number : { data.flatNumber } </p>
                    <p> Lease Start Date : 10-20-2022</p>
                    <p> Lease End Date : 10-20-2024</p>
                    <div className="dflex">
                        <p> Lease Members : </p>
                        {/* <Button> + </Button> */}
                    </div>
                    <ul>
                        <li> Hrithik </li>
                        <li> ABc </li>
                        <li> DEF </li>
                        <li> GHI </li>
                    </ul>
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

export default LeaseDetail;