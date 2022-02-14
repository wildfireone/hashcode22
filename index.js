var clients = 0;
var likes = []; 
var dislikes = [];
var ingredients =[];

var mcount = 0;
var startRow =0;
var startColumn =0;
var cellcount =0;


var fs = require('fs')
    // again
process.argv.forEach(function(val, index, array) {
    filename = val;

});


var LineByLineReader = require('line-by-line'),
  lr = new LineByLineReader(filename);
lr.on('error', function(err) {

    console.log(error);
    // 'err' contains error object
});

lr.on('line', function(line) {
    processPizzaLine(line);
    // 'line' contains the current line without the trailing newline character.
});

lr.on('end', function() {
    // All lines are read, file is closed now.
    //console.log(likes);
    //quickSolution();
    quickSolutionRemoveDislikes();
   // writeOutput(slices);
});

var evenline = false;
var firstline = true;
//this is all just processing.
function processPizzaLine(line) {
    if (firstline) {
        firstline = false;
        clients = parseInt(line);
        console.log(clients);
        evenline = true;
    }
    else {
        var linearray = line.split(' ');
        linearray.splice(0,1)
        ingredients.push(linearray);
        if (evenline){
        
            likes.push(linearray);
            evenline=false;
            
        }else{
            dislikes.push(linearray);
            evenline=true;
        }
    }
    
}

function quickSolution(){
    
    var slices = [];
    for(var i=0;i<likes.length;i++){
        slices.push(...likes[i]);
    }
    console.log(slices);
    writeOutput(slices);    

}

function quickSolution(){
    
    var slices = [];
    for(var i=0;i<likes.length;i++){
        slices.push(...likes[i]);
    }
    console.log(slices);
    writeOutput(slices);    

}

function quickSolutionRemoveDislikes(){
    
    var slices = [];
    
    for(var i=0;i<ingredients.length;i++){
        slices.push(...ingredients[i]);
    }
    console.log(slices);
    for(var i=0;i<dislikes.length;i++){
        for(var j=0;j<dislikes[i].length;j++){
            var disindex = slices.indexOf(dislikes[i][j]);
            if(disindex > -1){
                slices.splice(disindex,1);
                
            }
            
        }
    }
    //strip duplicates
    uniq = [...new Set(slices)];

    console.log(slices);
    writeOutput(uniq);    

}



function writeOutput(slices) {

    var logger = fs.createWriteStream(filename + ".out", {
        //flags: 'a' // 'a' means appending (old data will be preserved)
    });

    logger.write(slices.length.toString().trim()); // append string to your file
    logger.write(" ");
    for (var i = 0; i < slices.length; i++) {
        //var str = slices[i].toString();
        //str = str.replace(/,/g, ' ');
        logger.write(slices[i]);
        logger.write(" ");
    }
    logger.end();
}