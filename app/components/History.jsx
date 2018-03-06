var React = require('react');
var createReactClass = require('create-react-class');
var request = require('superagent');

const contentStyle = {
    color: 'black',
    fontSize: '25px',
}

const Button1Style = {
    width: '100px',
    background:'orange',
    marginLeft:'70px',
    padding:'2px',
    zIndex:'1'
  }

  
module.exports = createReactClass({
    clear:function() {
        request
            .post('/removedata')
            .end(function (err, res){
                if (err || !res.ok) {
                    console.log('Oh no! err');
                }else{
                    console.log("Successfully Cleared!");
                    document.getElementById("demo").innerHTML="";
                }
            })
            document.getElementById("demo").innerHTML="";
    },
    display: function () {

        request
            .post('/getdata')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('Oh no! err');
                } else {
                    var arr = JSON.parse(res.text);
                    var i;
                    var newArr = []
                    for (i = 0; i < arr.length; i++) {
                        newArr[i] = arr[i].expression;
                    }
                    var exp = [];
                    for(var i in newArr){
                        var key = i;
                        var val = newArr[i];
                        for(var j in val){
                            var sub_key = j;
                            exp.push(sub_key);
                        }

                        }
                    
                    var displayItem = "<ul>";

                    for(var i in exp){
                        displayItem += "<li>" + exp[i] + " = " + eval(exp[i]).toFixed(3).toString() + "</li>";
                    }
                    
                    displayItem += "</ul>";
                    document.getElementById("demo").innerHTML = displayItem; 


                }
            });
            setTimeout(this.display,2000);
    },
    render: function () {
        return (
            <div>
                {this.display()}
                <h2>History of Calculations</h2>
                <div id="demo" style = {contentStyle}>
                </div>
                <button onClick={this.clear} style={Button1Style}>Clear</button>
            </div>
        );
    }
});