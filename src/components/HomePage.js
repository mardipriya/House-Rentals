import * as React from 'react';
import Sidebar from './Sidebar';
import LeaseOptions from './LeaseOptions';
import FilterBox from './FilterBox';

const filterBoxStyle = {
    marginTop : "24px"
}

function HomePage(){

    const [filterDate, setFilterDate] = React.useState(null)
    const [filterType, setFilterType] = React.useState(null)

    const updateFilterDate = (date)=>{
        setFilterDate(date);
    }

    const updateFilterType = (type)=>{
        setFilterType(type);
    }

    return (
        <div class="dflex ai-stretch">
            <Sidebar userName="Hrithik M"/>
            <div style={ styles.mainContent}>
                <FilterBox updateType={updateFilterType} updateDate={updateFilterDate} style={filterBoxStyle}/>
                <LeaseOptions date={filterDate} type={filterType} fromPage={"Home"}/>
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