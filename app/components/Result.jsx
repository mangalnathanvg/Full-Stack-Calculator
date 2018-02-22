var React = require('react');
var createReactClass = require('create-react-class');


module.exports = createReactClass({
    render: function (){
      return (
      <div className='result'>
      <div> {this.props.result} </div>
         </div>
      )
    }
  });