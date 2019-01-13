import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { reactRender } from '@augury/core';
import { PerformanceProfilerPlugin } from '@augury/performance-profiler-plugin';



class App extends Component {
  state = {
    counter: 1,
    isRendering: false
  }



  render() {
    const rea = React

    return (
      <div className="App">
        {console.log('rendering')}
        {this.arr}
        <div>{this.state.counter}</div>
        <button onClick={() => this.setState({ counter: ++this.state.counter })}>+</button>
        <button onClick={() => this.setState({ counter: --this.state.counter })}>-</button>
      </div >
    );
  }
  arr = reactRender({
    React: this,
    jsx: {},
    plugins: [
      // new PerformanceProfilerPlugin(),
      // new OverlayCycleRuntimes(),
      // new OverlayHealthIndicator()
    ]
  });
}
const app = new App()
window.a = app

export default App;
