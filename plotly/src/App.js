import './App.css';
import Plot from 'react-plotly.js';
import React, { Component } from 'react';
import data from './sample.json'

import 'shebang-loader!requirejs'
const requirejs = require('requirejs');






function atm(from, to, divs) {
  const step = ~~((to - from) / divs);
  return Array.from(new Array(divs + 1), (v, k) => from + step * k);
}

function geo(from, to, base, subdivs, prec) {
  const step = Math.pow(base, 1 / subdivs),
    arr = [0],
    rounder = Math.pow(10, prec);
  let curr = from;
  console.log(curr, step);
  for (; curr < to + 0.01; curr *= step) {
    arr.push(Math.round(curr * rounder) / rounder);
  }
  return arr;
}

function labels(values, every_n) {
  return values.map((v, k) => (k > 1 && (k - 1) % every_n) === 0 ? v.toString() : "");
}


const click_callback = e=>{
  if(e.event.button === 2){
      console.log("rightlicked");
  }
}

class App extends Component {

  

  constructor(props) {
    super(props)

    data.data = data.data.sort((a, b) => a[0] - b[0]);
    this.dat = {
      x: data.data.map(x => x[0]),
      y: data.data.map(x => x[1]),
      type: 'scatter',
      mode: 'lines',
      marker: { color: 'red' },
    }


    this.ticks = geo(0.1, 100, 10, 10, 3)

    //this.ticks = [0,...Array.from(new Array(10).keys()).map(x=>(x+1)/10), ...Array.from(new Array(9).keys()).map(x=>x+2),...Array.from(new Array(9).keys()).map(x=>(x+2)*10)];

    console.log(this.ticks, labels(this.ticks, 10))
  }

  render() {
    return (
      <div contextMenu="console.log('context')">
        <h1>PLOTLY</h1>
        <Plot
          data={[
            this.dat
          ]}
          layout={{
            font: { size: 18 }, title: '3', xaxis: {
              type: 'log',
              autorange: true,
              nticks: 10,
              tickvals: this.ticks,
              ticktext: labels(this.ticks, 10),
              tickangle: 0
            },
            yaxis: {
              type: 'log',
              autorange: true,
              nticks: 10,
            }
          }}
          config={{ responsive: true }}
          onClick={click_callback}
          
        /></div>

    );
  }
}

export default App;