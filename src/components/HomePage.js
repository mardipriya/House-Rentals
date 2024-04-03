import * as React from 'react';
import Sidebar from './Sidebar';
import LeaseOptions from './LeaseOptions';
import FilterBox from './FilterBox';

import leaseOptions from './../components-data/LeaseOptionsData';

const filterBoxStyle = {
    marginTop : "24px"
}

function HomePage(){

    
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
        <div className="dflex ai-stretch">
            <Sidebar userName="Chakradhar"/>
            <div style={ styles.mainContent}>
                <FilterBox updateType={updateFilterType} updateDate={updateFilterDate} style={filterBoxStyle}/>
                <LeaseOptions date={filterDate} type={filterType} fromPage={"Home"} arr={data}/>
            </div>
        </div>
    )
}

const styles = {
    mainContent : {
        flex : 1,
        marginLeft : '200px'
    }
}

export default HomePage;