import Sidebar from './Sidebar';

function Status(){
    return (
        <div className="dflex ai-stretch">
            <Sidebar userName="Hrithik M"/>
            <div style={ styles.mainContent}>
                
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

export default Status;