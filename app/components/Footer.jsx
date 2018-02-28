
var React = require('react');
var createReactClass = require('create-react-class');

const Button1Style = {
  width: '100px',
  background:'orange',
  zIndex:'1'
}

const Button2Style = {
  width: '100px',
  background:'orange',
  zIndex:'-1'
}

module.exports = createReactClass({
    render: function(){
      return(
      <div className="footer">
        <button className="history" style={Button1Style}>History</button>
        <button className="back" style={Button2Style}>Back</button>
       </div>
      )
    }
  });