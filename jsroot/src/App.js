import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import './App.css';
import JSRootExample from "./jsrexample.js";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isReady: false };
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      if (isScriptLoadSucceed) {
        this.setState({
          isReady: true
        });
        console.log('ready');
      }
      else this.setState({
        hasError: true
      })
    }
  }


  render() {
    console.log(this.props)
    if (this.props.isScriptLoadSucceed) {
      return (
        <div>
          <h1>Hello</h1>
          <JSRootExample render={true} name='hist1' />
        </div>
      );
    }
    else {
      return (<div>Hello</div>)
    }

  }
}

export default scriptLoader(
  'https://root.cern.ch/js/latest/scripts/JSRoot.core.js'
)(App);