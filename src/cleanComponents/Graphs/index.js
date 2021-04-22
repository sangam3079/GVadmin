import React from 'react'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import data from './data.json'

const options = {
  chartPadding: {
    right: 20,
    left: 15,
    top: 15,
    bottom: 5,
  },
  fullWidth: true,
  showPoint: true,
  lineSmooth: true,
  axisY: {
    showGrid: false,
    showLabel: true,
    offset: 50,
  },
  axisX: {
    showGrid: false,
    showLabel: true,
    offset: 10,
  },
  
  showArea: false,
  
  plugins: [
    ChartistTooltip({
      anchorToPoint: false,
      appendToBody: true,
      seriesName: false,
    }),
  ], 
}

const Chart4v1 = () => {
  return (
    <div>
      <ChartistGraph
        className="height-200 ct-hidden-points"
        data={data}
        options={options}
        type="Line"
      />
    </div>
  )
}

export default Chart4v1
