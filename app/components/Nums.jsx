
var React = require('react');
var createReactClass = require('create-react-class');
var op = []; //array for storing numbers
var decimal = true; // to access decimal dot

var request = require('superagent');
module.exports = createReactClass({
   
    pusher: function (event) { //Will add the number to the display.
     event.preventDefault();
       var num = event.target.value;
       op += num;       
        this.props.setResult({display: op})       
    },
    
    pusher2: function (event) { //adds a operation to the display.
      event.preventDefault();
      var num = event.target.value;
      var last = op.charAt(op.length-1);      
         if ((last === "+") || (last === '*')|| (last ==='/') || (last ==='.')) { 
           //Do Nothing
         } else {
           op += num;
           decimal = true;
           this.props.setResult({display: op})
         }
    },
    
 
    
    pusher3: function(event){ // function for the '.'
      event.preventDefault();
      var num = event.target.value;
      if (decimal) {
      op += num;
      this.props.setResult({display: op})
      decimal = false; // when '.', sets decimal to false 
      }      
    },
    
    result: function(event){ // will execute the operation inside op
      event.preventDefault();
      
      var result = eval(op).toFixed(3);
      var ind = result.indexOf('.');
      var newItem = op+"="+result.toString();
      var newItem = newItem.toString();
      var data = newItem;
      request
        .post('/insertdata')
        .send(data)
        .end(function(err,res){
          if(err||!res.ok){
            console.log('Oh no! err');
          } else {
            console.log('Success');
          }
        });


      if (String(result).length <= 11) {
      this.props.setResult({result: result.slice(0,ind),
                           decimals: result.slice(ind)})
      }
    },
    
    reset: function(event){
      event.preventDefault();
      op=[];
      decimal = true;
      this.props.setResult({result: 0, display:0, decimals:'.000'});
    },
    
    delete: function(event){
      event.preventDefault();
      var test = false; // to test if im next to delete a '.'
      op = op.slice(0,-1);
      this.props.setResult({display: op})
      console.log(op.indexOf(op.length));
      if(op.charAt(op.length-1) === '.'){ //i know the next char is a '.'
        test= true;
        }
      if(test && (op.charAt(op.length-2) !== '.')){ // activates decimal when i delete a '.'
        decimal = true;
        test = false;
        console.log(test)
      }
      
    },
    
    render: function(){
      return(
        <div className='pad'>
          <div className='afterpad'>
            <div className='filter'>
      <form className='calc'>
      <div className='row'>
        <button onClick={this.reset} value={0}> C </button>
        <button onClick={this.delete}> DEL </button> 
        </div>
        
      <div>
      <button onClick={this.pusher} value={1}>1</button> 
      <button onClick={this.pusher} value={2}>2</button> 
      <button onClick={this.pusher} value={3}>3</button> 
      <button onClick={this.pusher2} value='+'>+</button>
      </div>
        
      <div>
      <button onClick={this.pusher} value={4}>4</button> 
      <button onClick={this.pusher} value={5}>5</button> 
      <button onClick={this.pusher} value={6}>6</button> 
      <button onClick={this.pusher2} value='-'>-</button>
      </div>
        
      <div>
      <button onClick={this.pusher} value={7}>7</button> 
      <button onClick={this.pusher} value={8}>8</button> 
      <button onClick={this.pusher} value={9}>9</button> 
      <button onClick={this.pusher2} value='*'>*</button>
      </div>
        
      <div className='lastrow'>
      <button onClick={this.pusher} value={0}>0</button> 
      <button onClick={this.pusher3} value='.'>.</button> 
      <button onClick={this.pusher2} value='/'>/</button>
      </div>
      </form> 
            </div>
          </div>
                        <button className="return" onClick={this.result}>=</button> 
          </div>
      )
    }
  });