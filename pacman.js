// Setup initial game stats
var score = 0;
var lives = 2;


// Define your ghosts here
// 1, Inky, Red, Shadow
// 2, Blinky, Cyan, Speedy
// 3, Pinky, Pink, Bashful
// 4, Clyde, Orange, Pokey
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

ghosts = [inky, blinky, pinky, clyde]

// add a function called eatGhost that accepts a ghost as an argument
// the eatGhost should check to see if a ghost is edible. If it's not, Pac-Man should lose a life, include a quick sentence that says the name and colour of the ghost that kills Pac-Man (similar to how it quickly flashes chomp on the screen when you eat a dot)
function eatGhost(ghost) {
  if (ghost.edible == false) {
    lives -= 1;
    console.log('Ghost ' + ghost.name + ', colour ' + ghost.colour + ' kills Pac-Man');
  }else {
    score += 5;
  }
  checkLives();
}

// If Pac-Man's lives go below 0, it's Game Over and you should exit the game. Create a function that checks for this every time Pac-Man loses a life, and calls process.exit(); if necessary.
function checkLives() {
  if (lives <= 0){
    console.log('Pac-Man dies!');
    process.exit()
  }
}


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  for (var i = 0; i < ghosts.length; i++) {
    console.log('('+ ghosts[i].menu_option + ') Eat ' + ghosts[i].name);
  }
  // console.log('(1) Eat Inky');
  // console.log('(2) Eat Blinky');
  // console.log('(3) Eat Pinky');
  // console.log('(4) Eat Clyde');
  console.log('(q) Quit');

}


function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
