var clients = 0;
var likes = [];
var dislikes = [];
var ingredients = [];

var mcount = 0;
var startRow = 0;
var startColumn = 0;
var cellcount = 0;





const { generatePrimeSync } = require('crypto');
var fs = require('fs')
// again
process.argv.forEach(function (val, index, array) {
    filename = val;

});


var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(filename);
lr.on('error', function (err) {

    console.log(error);
    // 'err' contains error object
});

lr.on('line', function (line) {
    processPizzaLine(line);
    // 'line' contains the current line without the trailing newline character.
});

lr.on('end', function () {
    // All lines are read, file is closed now.
    //console.log(likes);
    //quickSolution();
    //quickSolutionRemoveDislikes();


    genetical();
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
        linearray.splice(0, 1)
        ingredients.push(linearray);
        if (evenline) {

            likes.push(linearray);
            evenline = false;

        } else {
            dislikes.push(linearray);
            evenline = true;
        }
    }

}

function quickSolution() {

    var slices = [];
    for (var i = 0; i < likes.length; i++) {
        slices.push(...likes[i]);
    }
    console.log(slices);
    writeOutput(slices);

}

function quickSolution() {

    var slices = [];
    for (var i = 0; i < likes.length; i++) {
        slices.push(...likes[i]);
    }
    console.log(slices);
    writeOutput(slices);

}

function quickSolutionRemoveDislikes() {

    var slices = [];

    for (var i = 0; i < ingredients.length; i++) {
        slices.push(...ingredients[i]);
    }
    console.log(slices);
    for (var i = 0; i < dislikes.length; i++) {
        for (var j = 0; j < dislikes[i].length; j++) {
            var disindex = slices.indexOf(dislikes[i][j]);
            if (disindex > -1) {
                slices.splice(disindex, 1);

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


var population = [];
var dislikelist =[];

function genetical() {


    for (var i = 0; i < ingredients.length; i++) {
        population.push(...ingredients[i]);
    }

    for (var i = 0; i < dislikes.length; i++) {
        dislikelist.push(...dislikes[i]);
    }

    //console.log(likes);
    //writeOutput(slices);

    //strip duplicates
    population = [...new Set(population)];

    var firstPhenotype = {
        ingredients: population
        // enter phenotype data here
    }

    var GeneticAlgorithmConstructor = require('geneticalgorithm')
    var config = {
        mutationFunction: mutationFunction,
        //crossoverFunction: crossoverFunction,
        fitnessFunction: fitnessFunction,
        population: [firstPhenotype]
    };
   var geneticAlgorithm = GeneticAlgorithmConstructor( config )

fitnessFunction(firstPhenotype);

     console.log("Starting with:")
    console.log(firstPhenotype)
    for (var i = 0; i < 10; i++) {
        geneticAlgorithm.evolve()
        console.log(i+" best:"+geneticAlgorithm.best().score);
    }
    var best = geneticAlgorithm.best()
    delete best.score
    console.log("Finished with:")
    console.log(best) 

    writeOutput(best.ingredients);


}

function mutationFunction(phenotype) {
    //console.log(phenotype);
    //remove random number of dislikes
    var numberToRemove = randomInt(0, dislikelist.length);
    var newingredients = [...phenotype.ingredients];

    
    for (var i = 0; i < numberToRemove; i++) {
        var disindex = newingredients.indexOf(dislikelist[randomInt(0, dislikelist.length)]);
        newingredients.splice(disindex, 1);
    }
    
    phenotype = {
        ingredients: newingredients
        // enter phenotype data here
    }
    //console.log("removed:"+numberToRemove);
    //console.log(phenotype);
    // make a random change to phenotype
    return phenotype
}

function crossoverFunction(phenotypeA, phenotypeB) {
    // move, copy, or append some values from a to b and from b to a
    return [phenotypeA, phenotypeB]
}

function fitnessFunction(phenotype) {
    var score = 0
    
    for(var i=0; i< likes.length;i++){
        var ok = true; 
        for (var j=0; j<likes[i].length;j++){
            //console.log(likes[i][j]);
            //console.log(phenotype)
            if(phenotype.ingredients.indexOf(likes[i][j])<0){
                ok = false;
                
            }
        }
        for (var j=0; j<dislikes[i].length;j++){
            //console.log(dislikes[i][j]);
            if(phenotype.ingredients.indexOf(dislikes[i][j])>-1){
                ok = false;
            }
        }
        if(ok){
            score++;
        }
    }
    //console.log(score);
    // use your phenotype data to figure out a fitness score
    return score
}


function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }







