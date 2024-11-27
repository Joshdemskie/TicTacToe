
/*joshua demskie assignment 2 mr sheehan */

/* global $ */
/* global location */

var Cell = function(e) {
	this.element = e;	
};

var markerX = "X";
var markerO = "O";
var marker = markerX;
var plays = 0;
var check = 0;


var changeTurn = function() {
	plays ++;
	if(marker === markerX) {
            marker = markerO;
	} 
    else marker = markerX;
};

Cell.prototype.takeTurn = function() {
    if (marker === markerX || marker === markerO){
		this.element.addClass(marker).text(marker).hide().fadeIn(1500);
	this.element.text(marker);
	if (checkForWin()) return;
	changeTurn();
    autoTurn();      // O Moves Automatically
    checkForWin();
    changeTurn();
    }
};

var autoTurn = function() 
{
	//creates a collection with all of the empty cells available using the empty and class selectors
    var emptyCells = $('.cell:empty');
	//checks to see if theres an empty cell left
    if (emptyCells.length > 0) 
	{
		//creates a random index within the created collection of empty cells
        var randomIndex = parseInt(Math.random()* emptyCells.length);
		
		//creates a random empty cell with the above created index in the new collection
        var randomCell = emptyCells.eq(randomIndex);
		
		//obtains the Id of the correct cell
        var cellId = randomCell.attr('id');
        
        //displays the X on the specific cell("#") using the Id we grabbed also uses inline css to make it red
     $('#' + cellId).text(markerO).css('color', 'red').hide().fadeIn(6000);
        
        if (checkForWin())
		{
			return; //if 0 player wins return back to players turn
		}
        
    }
};

var checkForWin = function() {
	
    if (won()) {
        alert(marker + " wins");
        resetGame();
        return true;
    }
    else {
        
        if (draw()) {
            alert("draw");
            resetGame();
        }
        
    }
    return false;
};

var won = function() {
    
    var wins = [
	[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6]
    ];
    
    for (var i = 0; i < wins.length; i++){
        
        if( $('#' + wins[i][0]).text() === marker &&
            $('#' + wins[i][1]).text() === marker &&
            $('#' + wins[i][2]).text() === marker )
        {
            return true;
        }
        else if (i === wins.length-1){
            return false;
        }
        
    }
    
    
};

var draw = function() {
    
    for (var i = 0; i < 9; i++) {
        if($('#' + i).text() === markerX || $('#' + i).text() === markerO){
            check++;
        }
    }
    if (check === 9){
        return true;
    }
    else {
        check = 0;
        return false;
    }
    
};

var resetGame = function() {
	location.reload();
};

Cell.prototype.listen = function() {
	var that = this;
	this.element.on('click', function(){	
		that.takeTurn();
		$(this).off('click');
	});
};

$(document).ready(function() {
    $('#board').hide();
    $('h2').hide();
	alert ("You are turn 1 player, please pick a square to face the AI opponent!(version 1)");
    introduction();
	$('#board').show();
    $('.cell').each( function() {
            var cell = new Cell($(this));
            cell.listen();
    });
});
//allows the board from the DIV  fade in slowly at start
var introduction = function(){
	$('#board').fadeIn(1500)
	
};