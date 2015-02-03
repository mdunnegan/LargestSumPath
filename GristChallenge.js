$(document).ready(function(){

    $.getJSON('apply-20-challenge.json', function(data) {

        console.log(data); // this is valid!!

        //var sum = JSON.parse(data);
        console.log(" %d ", maxCost(data));
    });

});

function maxCost(cost){

    var m = cost.length;        // num rows
    var n = cost[0].length;     // num colums

    // array of minimum costs of getting to this square
    var tc = [];
    for (var i = 0; i < m ; i++){
        tc[i] = [];    
        for (var j = 0; j < n; j++){ 
            tc[i][j] = cost[i][j];
        }
    }

    // initialize column
    for (var i = 1; i < m; i++){ // changed to < from <=
        tc[i][0] = tc[i-1][0] + cost[i][0];
    }

    // initialize row
    for (var j = 1; j < n; j++){
        tc[0][j] = tc[0][j-1] + cost[0][j];
    }

    // the other stuff, runs in O(mn) time
    for (var i = 1; i < m; i++){
        for (j = 1; j < n; j++){
            tc[i][j] = Math.max(tc[i-1][j], tc[i][j-1]) + cost[i][j];
        }
    }


    // set up for variable to reverse-trace the path 
    var x = (m-1)+(n-1);
    var i = m-1;
    var j = n-1;

    var backwards_solution = '';

    // traverses tc backwards, gets a string, reverses it
    for (var c = 0; c < x; c++){
        if ( i == 0 ){
            for (var w = 0; w < (x-c); w++){
                backwards_solution += 'R';
            }
            break;
        } else if (j == 0){
            for (var w = 0; w < (x-c); w++){ // c-i
                backwards_solution += 'D';
            }
            break;
        }

        // they could be the same, but if they are, it doesn't matter, because both paths give the same result
        if (tc[i-1][j] > tc[i][j-1]){
            backwards_solution += 'D';
            i--;
        } else {
            backwards_solution += 'R';
            j--;
        }
    }

    console.log(backwards_solution.split('').reverse().join(''));
    
    return tc[m-1][n-1];
}


