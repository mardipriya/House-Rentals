import Sidebar from './Sidebar';
import {Paper, Button } from '@mui/material'
import LinearProgress from '@mui/joy/LinearProgress';

import data from './../components-data/StatusData'

function Status(){
    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar"/>
            <div className="dflex jc-around" style={ styles.mainContent}>
                <Paper elevation={5} sx={{width : "80%", padding : "32px"}}>
                    { !data['hasApplied']  ? 
                        <div className="w100 tcenter">
                            <h3> You have not applied to any Apartments.  </h3>
                        </div>

                        : 
                        //Conditional Rendering
                        <div>
                            <div className="dflex jc-around w100">
                                <img src={data.thumbnail} width="400px" height="300px"></img>
                            </div>
                            <h4> Status : {data.status} </h4>
                            <LinearProgress
                                color={data.status!="Rejected" ? "primary" : "danger"}
                                determinate={true}
                                size="lg"
                                value={ data.progress}
                                variant="solid"
                            />

                            <h4> Application Details : </h4>
                            <p> Apartment Number : {data.apartmentNumber} </p>
                            <p> Flat Number : { data.flatNumber } </p>
                            <p> Owner Name : { data.ownerName} </p>
                            <p> Owner Contact : {data.ownerContact}</p>
                            {/* <div className="dflex">
                                <Button variant="outlined" > View Apartment Details </Button>
                            </div> */}
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

export default Status;