import Sidebar from './Sidebar';
import {Paper, Button } from '@mui/material'
import Carousel from './Carousel';
import LinearProgress from '@mui/joy/LinearProgress';

import data from './../components-data/ApartmentData'

function ViewApartment(){

    const applyToApartment = () =>{
        console.log("Function Called")
    }

    return (
        <div class="dflex ai-stretch">
            <Sidebar userName="Hrithik M"/>
            <div className="dflex jc-around" style={ styles.mainContent}>
                <Paper elevation={5} sx={{width : "80%", padding : "32px"}}>
                    <Carousel images={data.images}/>
                    <h2>Apartment {data.apartmentNumber}</h2>
                    <p>Location: {data.address.city}, {data.address.state}</p>
                    <p>Price: $ {data.pricePerMonth}/month</p>
                    <p>Bedrooms: {data.bedrooms} | Bathrooms: {data.bathrooms}</p>
                    <p>Description: {data.description}</p>

                    <p> Address : {data.apartmentNumber}-{data.flatNumber} , <br/> {data.address.lane}, <br/> 
                     {data.address.city}, {data.address.state} <br/>
                     {data.address.zip}
                    </p>
                    <p> Owner Name : {data.ownerName} </p>
                    <p> Owner Contact : {data.ownerContact}</p>
                    <div className="w100 tcenter dflex jc-around">
                        <Button variant="outlined" onClick={applyToApartment}> Apply Now !</Button>
                    </div>
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

export default ViewApartment;