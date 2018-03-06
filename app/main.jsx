var React = require('react');
var ReactDOM = require('react-dom');
console.log("Hello from JSX!!");

var Calc = require('./components/Calc.jsx');
var History = require('./components/History.jsx');


/**
 * Rendering Class components into index.ejs
 */
ReactDOM.render(<Calc />, app)
ReactDOM.render(<History />, log)