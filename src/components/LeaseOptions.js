import * as React from 'react';

import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const containerStyle ={
    width : "100%",
    marginTop : "80px"
}


function LeaseOptions( props ){

    /* Implement Filter with values from props */

    const handleApply = ()=>{
        if( props.fromPage === "Main"){
            window.location.href = '/login';
        }
        else{
            window.location.href = '/apartment'
        }
    }

    return (
        <div style={containerStyle}>
            <h1 className="tcenter"> AVAILABLE FLOOR PLANS </h1>
            <div className="dflex jc-around ai-center fwrap">
                { props.arr.map( (object, i) => (
                        <Paper elevation={5} sx={{ display : "flex", flexDirection : "column", textAlign : 'left', margin : '32px', padding : "48px"}}>
                            <div className="w100 dflex jc-around">
                                <img src={ require('./../images/' + object['image']) } width="160px" height="160px"></img>
                            </div>
                            <p> Apartment Number : {object['apt-number']} </p>
                            <p> Flat Number : {object['flat-number']} </p>
                            <p> Bedrooms : {object['bedrooms']} </p>
                            <p> Available From : {object['avail-from']}  </p>
                            <Button variant="outlined" onClick={ handleApply }> Apply Now ! </Button>
                        </Paper>
                    ))
                }
            </div>
        </div>
    )
}


export default LeaseOptions;