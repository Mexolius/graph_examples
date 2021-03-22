import './App.css';
import Plot from 'react-plotly.js';
import React, { Component, createRef } from 'react';
import data from './sample.json'




function atm(from, to, divs) {
  const step = ~~((to - from) / divs);
  return Array.from(new Array(divs + 1), (v, k) => from + step * k);
}

function geo(from, to, base, subdivs, prec) {
  const step = Math.pow(base, 1 / subdivs),
    arr = [0],
    rounder = Math.pow(10, prec);
  let curr = from;
  for (; curr < to + 0.01; curr *= step) {
    arr.push(Math.round(curr * rounder) / rounder);
  }
  return arr;
}

function labels(values, every_n) {
  return values.map((v, k) => (k > 0 && (k - 1) % every_n) === 0 ? v.toString() : "");
}



class App extends Component {

  swap_axis_density() {
    this.density_state = (this.density_state + 1) % 4;
    switch (this.density_state) {
      case 0:{
          this.x_label_gap = 10;
        break;
      }
      case 1:{
        this.y_label_gap = 2;
        break;
      }
      case 2:{
        this.x_label_gap = 5;
        break;
      }
      case 3:{
        this.y_label_gap = 4;
        break;
      }
      default: {
        
      }
    }
    this.forceUpdate();
  }


  swap_axis_state() {
    this.axis_state = (this.axis_state + 1) % 4;
    switch (this.axis_state) {
      case 0: {
        this.xticks = geo(0.1, 100, 10, 10, 3);
        this.xaxis.tickvals = this.xticks;
        this.xaxis.ticktext = labels(this.xticks, this.x_label_gap);
        this.xaxis.type = 'log';
        break;
      }
      case 1: {
        this.yticks = atm(0, 50000, 10);
        this.yaxis.tickvals = this.yticks;
        this.yaxis.ticktext = labels(this.yticks, 1);
        this.yaxis.type = 'linear'
        break;
      }
      case 2: {
        this.xticks = atm(0, 200, 20);
        this.xaxis.tickvals = this.xticks;
        this.xaxis.ticktext = labels(this.xticks, 2);
        this.xaxis.type = 'linear';
        break;
      }
      case 3: {
        this.yticks = geo(1, Math.pow(2, 16), 2, 2, 3);
        this.yaxis.tickvals = this.yticks;
        this.yaxis.ticktext = labels(this.yticks, this.y_label_gap);
        this.yaxis.type = 'log'
        break;
      }
      default: { }
    }
    this.forceUpdate();

  }

  componentDidMount() {
    this.divplot.current.addEventListener("contextmenu", e => {
      e.preventDefault();
      this.swap_axis_state();
    })

    this.divplot.current.addEventListener("click", e => {
      this.swap_axis_density();
    })



  }

  constructor(props) {
    super(props)

    this.axis_state = 0;
    this.density_state = 0;
    this.divplot = createRef();

    data.data = data.data.sort((a, b) => a[0] - b[0]);
    this.dat = {
      x: data.data.map(x => x[0]),
      y: data.data.map(x => x[1]),
      type: 'scatter',
      mode: 'lines',
      marker: { color: 'red' },
    }

    this.x_label_gap = 10;
    this.y_label_gap = 4;

    this.xticks = geo(0.1, 100, 10, 10, 3);
    this.xlabels = labels(this.xticks, this.x_label_gap);
    this.yticks = geo(1, Math.pow(2, 16), 2, 2, 3);
    this.ylabels = labels(this.yticks, this.y_label_gap);

    this.xaxis = {
      type: 'log',
      autorange: true,
      nticks: 20,
      tickvals: this.xticks,
      ticktext: this.xlabels,
      tickangle: 0
    }

    this.yaxis = {
      type: 'log',
      autorange: true,
      nticks: 20,
      tickvals: this.yticks,
      ticktext: this.ylabels
    }
  }

  shouldComponentUpdate(){
    
  }

  render() {
    return (
      <div ref={this.divplot}>
        <h1>PLOTLY</h1>

        <Plot
          data={[
            this.dat,
          ]}
          layout={{
            font: { size: 18 },
            title: 'Plotly Graph',
            xaxis: this.xaxis,
            yaxis: this.yaxis
          }}
          config={{ responsive: true }}
        /></div>

    );
  }
}

export default App;