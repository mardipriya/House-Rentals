import * as React from 'react';

import Header from './Header';
import Footer from './Footer';
import LeaseOptions from './LeaseOptions'

import FilterBox from './FilterBox'

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

    const [data, setData] = React.useState(leaseOptions);
    React.useEffect(() => {
        console.log("Data Updated : "+data);
    }, [data]);

    const [filterDate, setFilterDate] = React.useState(null)
    const [filterType, setFilterType] = React.useState(null)

    const updateFilterDate = (date)=>{
        const filteredData = leaseOptions.filter(item => {
            const itemDate = new Date(item['avail-from']).getTime();
            const filterDateTime = new Date(filterDate).getTime();
            console.log("Option Date "+item['avail-from']+" "+itemDate);
            console.log("Filter Date "+filterDate+" "+filterDateTime);
            return itemDate >= filterDateTime;
        });
        setData(filteredData);
        setFilterDate(date);
    }

    const updateFilterType = (type)=>{
        console.log("Came Here bro "+type)
        const filteredData = leaseOptions.filter(item => {
            return item['bedrooms'] === type;
        });
        console.log(filteredData);
        setData(filteredData);
        console.log(data);
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
            <FilterBox updateType={updateFilterType} updateDate={updateFilterDate} style={searchBoxStyle}/>
                <LeaseOptions date={filterDate} type={filterType} fromPage={"Main"} arr={data}/>
            <Footer/>
        </div>
    )
}


export default MainPage;