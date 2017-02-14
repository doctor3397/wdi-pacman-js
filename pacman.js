// Setup initial game stats
var score = 0;
var lives = 2;
var power_pellets = 4;
var dots = 240;
var fruitShown = false;
var level = 0;

var levels = {
  1: {fruit: 'Cherry', points: 100},
  2: {fruit: 'Strawberry', points: 300},
  3: {fruit: 'Orange', points: 500},
  4: {fruit: 'Orange', points: 500},
  5: {fruit: 'Apple', points: 700},
  6: {fruit: 'Apple', points: 700},
  7: {fruit: 'Pineapple', points: 1000},
  8: {fruit: 'Pineapple', points: 1000},
  9: {fruit: 'Galaxian Spaceship', points: 2000},
  10: {fruit: 'Galaxian Spaceship', points: 2000},
  11: {fruit: 'Bell', points: 3000},
  12: {fruit: 'Bell', points: 3000},
  13: {fruit: 'Key', points: 5900},
}

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false,
  point: 200,
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false,
  point: 400,
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false,
  point: 800,
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false,
  point: 1600,
};

ghosts = [inky, blinky, pinky, clyde]

// If Pac-Man's lives go below 0, it's Game Over and you should exit the game. Create a function that checks for this every time Pac-Man loses a life, and calls process.exit(); if necessary.
function checkLives() {
  if (lives <= 0){
    console.log('Pac-Man dies!');
    process.exit()
  }
}

// add a function called eatGhost that accepts a ghost as an argument
// the eatGhost should check to see if a ghost is edible. If it's not, Pac-Man should lose a life, include a quick sentence that says the name and colour of the ghost that kills Pac-Man (similar to how it quickly flashes chomp on the screen when you eat a dot)

//say a quick sentence about the ghost just eaten and its personality (similar to how it flashes Chomp! when Pac-Man eats a dot)
// Pac-Man gains 200 points
// the ghost's edible property changes to false (as it regenerates in its offensive form)
function eatGhost(ghost) {
  if (ghost.edible == false) {
    lives -= 1;
    console.log('Ghost ' + ghost.name + ', colour ' + ghost.colour + ' kills Pac-Man');

  } else {

    console.log('\nPac-man eats ' + ghost.name + '!');
    score += ghost.point;
    ghost.edible = false;
  }
  checkLives();
}

//eatPowerPellet function that's executed when the p key is entered. It should:
// increase Pac-Man's score by 50 points
// change all the ghost's edible property to true
// reduce the number of Power-Pellets remaining
function eatPowerPellet() {
  score += 50;
  power_pellets -= 1;

  ghostsEdible(true);

  setTimeout(function() {
    ghostsEdible(false);
    drawScreen();
  }, 5000)

  // for (var i = 0; i < ghosts.length; i++) {
  //  ghosts[i].edible = true;
  // }
}

function ghostsEdible(t){
  for (var i = 0; i < ghosts.length; i++) {
    if (t == true){
      ghosts[i].edible = true;
    } else {
      ghosts[i].edible = false;
    }
  }
  console.log("Ghosts are set to " + t);
}


// Draw the screen functionality
function drawScreen() {
  setTimeout(function() {
    clearScreen();
    displayStats();
    displayMenu();
    displayPrompt();
  }, 800);
}

//keyboard shortcut to clear terminal
function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives  + '\n\nPower-Pellets: ' + power_pellets +
  '\n\nDots: ' + dots +
  '\n\nLevel: ' + level +
  '\n\nFruitshown: ' + fruitShown);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line

  //Eat Fruits
  if (fruitShown == true) {
    console.log('(g) '+ 'Eat ' + levels[level].fruit + ' ' + levels[level].points + ' Dots');
  }

  //Eat Dots
  if(dots > 100 ){
    console.log('(d) Eat 10 Dots');
    console.log('(e) Eat 100 Dots');
    console.log('(f) Eat All Dots');
  }else if(dots > 10){
    console.log('(d) Eat 10 Dots');
    console.log('(f) Eat All Dots');
  }else{
    console.log('(f) Eat All Dots');
  }

  //Eat Power-Pellet
  console.log('(p) Eat Power-Pellet');

  //(1) Eat Inky
  for (var i = 0; i < ghosts.length; i++) {
    console.log('('+ ghosts[i].menu_option + ') Eat ' + ghosts[i].name + ' Edible: '+ ghosts[i].edible);
  }

  console.log('(q) Quit');

}


function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot(n) {
  console.log('\nChomp!');
  if( n==10 ){
    score += 10;
    dots -= 10;
  }else if( n == 100 ){
    score += 100;
    dots -= 100;
  }else{
    score += dots;
    dots = 0;
  }
}

//After Pac-Man has eaten all 4 power pellets and all 240 dots in the maze, he advances to the next level and the dots and pellets are reset. The ghosts should also be reset to inedible. There are 256 levels. Add the appropriate fruits. Make the fruit option randomly appear in the menu after the player eats some dots.
function showFruit() {
  if (fruitShown === false && Math.random() < 0.7 ){
    fruitShown = true;
  }
}

function eatFruit(level) {
  score += levels[level].points;
  fruitShown = false;
}

function checkLevel() {
  if (dots === 0 && power_pellets === 0){
    level += 1;
    dots = 240;
    power_pellets = 4;
    ghostsEdible(false);
    fruitShown = false;
  }
}

// Prevent Pac-Man from eating a power-pellet if one has already been consumed and there are edible ghosts remaining.
function checkGhostsEdible() {
  for (var i = 0; i < ghosts.length; i++) {
    if (ghosts[i].edible === true){
      return true;
    }
  }
  // When no one's edible
  return false;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'p':
      // Check if all ghosts are not edible
      if (checkGhostsEdible() === false){
        eatPowerPellet();
      } else {
        console.log("Eat all the ghosts before eat a Power Pellet")
      }
      break;
    case 'd':
      eatDot(10);
      break;
    case 'e':
      eatDot(100);
      break;
    case 'f':
      eatDot();
      break;
    case 'g':
      eatFruit(level);
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
  if (level >= 1) {
    showFruit();
  }
  checkLevel();
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
