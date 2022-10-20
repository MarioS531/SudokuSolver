//Load boards from file or manually
const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

  //Create variables
var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedFile;
var disableSelect;

window.onload = function()
{
    //Run startgame function when button is clicked
    id("start-btn").addEventListener("click", startGame);
}

function startGame()
{
    //Choose board difficulty
    if(id("diff-1").checked) board = easy[0];
    else if (id("diff-2").checked) board = medium[0];
    else board = hard[0];

    //Set lives to 3 and enable selecting numbers and tiles
    lives = 3;
    disableSelect = false;
    id("lives").textContent = "Lives Remaining: " + lives;

    //Create board based on difficulty
    generateBoard(board);
    
    //Starts the time
    startTimer();

    //Sets theme based on input
    if(id("theme-1").checked)
    {
        qs("body").classList.remove("dark");
    }
    else
    {
        qs("body").classList.add("dark");
    }

    //Show number container
    id("number-container").classList.remove("hidden");
}

function startTimer()
{
    //Sets time remaining based on input
    if(id("time-1").checked) timeRemaining = 180;
    else if (id("time-2").checked) timeRemaining = 300;
    else timeRemaining = 600;
    //Sets timer for first second
    id("timer").textContent = timeConversion(timeRemaining);
    //Sets timer to update every second
    timer = setInterval(function()
    {
        timeRemaining--;
        //If no time remaining, end the game
        if(timeRemaining === 0) endGame();
        id("timer").textContent = timeConversion(timeRemaining);
    }, 1000)
}

//Converts seconds into string of MM SS format
function timeConversion(time)
{
    let minutes = Math.floor(time/60);
    if(minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if(seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

function generateBoard(board)
{
    //Clear previous board
    clearPrevious();
    //Let used to increment tile id's
    let idCount = 0;
    //Create 81 tiles for a 9x9 board
    for(let i = 0; i < 81; i++)
    {
        //Create a new paragraph element
        let tile = document.createElement("p");
        //If tile is not supposed to be blank
        if(board.charAt(i) != "-")
        {
            //Set tile text to correct number
            tile.textContent = board.charAt(i);
        }
        else
        {
            //Add click event listener to tile

        }
        //Assign a tile id
        tile.id = idCount;
        //Increment for next tile
        idCount++;
        //Add tile class to all tiles
        tile.classList.add("tile");
        if((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54))
        {
            tile.classList.add("bottomBorder");
        }
        if((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6)
        {
            tile.classList.add("rightBorder")
        }

        //Add tile to board
        id("board").appendChild(tile);
    }

}

function clearPrevious()
{
    //Access all of the tiles
    let tiles = qsa(".tiles");

    //Remove each tile
    for(let i=0; i < tiles.length; i++)
    {
        tiles[i].remove();
    }

    //If there is a timer, clear it
    if(timer) clearTimeout(timer);

    //Deselect any numbers
    for(let i=0; i < id("number-container").children.length; i++)
    {
        id("number-container").children[i].classList.remove("selected");
    }

    //Clear selected variables
    selectedTile = null;
    selectedNum = null;
}

//Helper Functions
function qs(selector)
{
    return document.querySelector(selector);
}

function qsa(selector)
{
    return document.querySelectorAll(selector);
}

function id(id)
{
    return document.getElementById(id);
}