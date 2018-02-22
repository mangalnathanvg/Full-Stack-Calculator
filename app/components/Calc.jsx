var React = require('react');
var createReactClass = require('create-react-class');
var Result = require('./../components/Result.jsx');
var Display = require('./../components/Display.jsx');
var Nums = require('./../components/Nums.jsx');
var Footer = require('./../components/Footer.jsx');

module.exports = createReactClass({
   
    getInitialState: function(){
        return {
          display: 0,
          result: 0,
          decimals: ".000"
        }
      },
    
    setResult: function(updates){
      this.setState(updates)
    },
    
    render: function(){
      var result = this.state.result;
      var display = this.state.display;
      var decimals = this.state.decimals;
      
      return(
        <div>
          <Result result={result+decimals} />
        <Display display={display} />
          <Nums setResult={this.setResult}/>
          <Footer />
          </div>
      )
    }
  });
  