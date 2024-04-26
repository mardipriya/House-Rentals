import * as React from 'react';

import Header from './Header';
import Footer from './Footer';
import LeaseOptions from './LeaseOptions'

import FilterBox from './FilterBox'

import {fetchAvailableApartments} from './ServerRequests'; 

import leaseOptions from './../components-data/LeaseOptionsData';

const headingStyle = {
    fontSize : "64px",
    width : "45%",
    textAlign : "left",
    marginTop : "160px",
    marginLeft : "32px",
    fontWeight : "600"
} 

const searchBoxStyle = {
    position : 'absolute',
    top : '106%',
    left : '30%',
}

function MainPage(){

    const response = fetchAvailableApartments();
    console.log(response);

    const [data, setData] = React.useState(leaseOptions);
    React.useEffect(() => {
        console.log("Data Updated : "+data);
    }, [data]);

    const [filterDate, setFilterDate] = React.useState(null)
    const [filterType, setFilterType] = React.useState(null)

    const updateFilter = (date, type)=>{
        const filteredData = leaseOptions.filter(item => {
            const itemDate = new Date(item['avail-from']).getTime();
            const filterDateTime = new Date(date).getTime();
            return itemDate >= filterDateTime && item['bedrooms'] === type;
        });
        setData(filteredData);
        setFilterDate(date);
        setFilterType(type);
    }
    
    return (
        <div>
            <div className="landing-page">
                <Header hasLoginBtn={true}/>
                <div className="dflex">
                    <h1 className="color--white" style={ headingStyle }>
                        Welcome to Your Dream Home : Find Your Perfect Rental
                    </h1>
                </div>
            </div>
            <FilterBox updateFilter={updateFilter} style={searchBoxStyle}/>
                <LeaseOptions fromPage={"Main"} arr={data}/>
            <Footer/>
        </div>
    )
}


export default MainPage;