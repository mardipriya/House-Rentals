import * as React from 'react';

import Header from './Header';
import Footer from './Footer';
import LeaseOptions from './LeaseOptions'

import FilterBox from './FilterBox'


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
            <FilterBox style={searchBoxStyle}/>
            <LeaseOptions fromPage={"Main"}/>
            <Footer/>
        </div>
    )
}

export default MainPage;