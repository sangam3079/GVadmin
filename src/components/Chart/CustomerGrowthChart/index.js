import React, {useState} from 'react'
import Select from 'react-select'
import CustomerGrowthChart from './CustomerGrowthChart'
import WidgetChart from '../../../cleanComponents/Graphs'


const customStyles = {
    
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 130,
    height:30,
    padding:0,
    display: 'flex',
    flexDirection: 'row'
    
  }),
  
}

const CustomerGrowth =() => {

  var chartlist = [
    {
        value:1,
        label:'This week',
        chart:<CustomerGrowthChart/>
    },
    {
        value:2,
        label:'This month',
        chart: <CustomerGrowthChart />
    },
    {
        value:3,
        label:'This year',
        chart: <CustomerGrowthChart />
    },
]


const [clicked, setClicked] =useState(true)
const [result, chartValue] = useState(chartlist.chart);

const handler = e => {
    setClicked(false)
    chartValue(e.chart);

    
}



  return (
      <div className="card" style={{height:450}}>
        <div className="card-header" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:70}}>
            <div className="utils__title text-uppercase">
										<strong>Customers Chart</strong>
						</div>

            <div style={{background:'#E7E7F6 ', borderRadius:17, fontFamily:'Sofia Pro'}}>
              <Select 
                // defaultValue={chartlist[0]}  
                  options={chartlist} 
                  onChange={handler} 
                  styles={customStyles}
                  isSearchable={false}
                  theme={theme => ({
                  ...theme,
                  borderRadius: 10,
                  width:80,
                  colors: {
                    ...theme.colors,
                  //  primary25: 'priamry25',
                    primary: 'lightgray',
                  }, 
                })} 
              />
          </div>
        </div>
        <div style={{marginTop:20, marginBottom:10}}>
          { 
            clicked ?  <CustomerGrowthChart /> : ''
          }
          {result}
            
        </div>
      </div>
  )
}

export default CustomerGrowth
