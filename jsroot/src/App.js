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
      }
      else this.setState({
        hasError: true
      })
    }
  }




  render() {
    if (this.state.isReady) {
      return (
        <div>
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