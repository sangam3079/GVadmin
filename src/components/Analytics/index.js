import React, {useState, useEffect} from 'react'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from '../../components/Header/Header'
import { db } from '../../firebase'
import WidgetChart from '../../cleanComponents/Graphs'


function Analytics() {
    /*
    const[datas, setDatas] = useState([])

    //when the app loads, we need to listen to the database and fetch new data as they get added/removed
    useEffect(() => {
        //this code here.. fires when the app.js loads
        db.collection('Splash Screen').onSnapshot(snapshot => {
         //console.log(snapshot.docs.map(doc => doc.data()));
          //get data from database
         // setDatas(snapshot.docs.map(doc=>doc.data()));
        })
    }, []);
*/


    function showWeeklyChart() {
        console.log('week')
      }
    function showMonthlyChart() {
    console.log('month')
    }
      
      

    return (
        <CustomLayout>
            <div className="card">
                <Header
                    title = "Analytics"
                />
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                        { /*datas.map((a)=>
                          <>
                            <li>{a.Country}</li> 
                          </> 
                        ) */}
                        </div>
                    </div>
                </div> 
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-4">
                           <button onClick={showWeeklyChart()}>This week</button>
                           <button onClick={showMonthlyChart()}>This month</button>    
                        </div>
                    </div>
                </div> 
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-4">
                           <WidgetChart />
                        </div>
                    </div>
                </div> 
            </div>
             <ul>
                
             
             </ul>
		</CustomLayout>
    )
}

export default Analytics
