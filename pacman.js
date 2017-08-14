// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here

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

var ghosts = [inky, blinky, pinky, clyde]

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
  console.log('\n\n\nPower Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) eat Dot');
  if (powerPellets >= 1) {
  console.log('(p) eat Power Pellet');
  }
  for (var i = 0; i < ghosts.length; i++) {
    if (ghosts[i].edible === false) {
    console.log("(" + (i + 1) + ") eat " + ghosts[i].name + " (inedible)");
  } else {
    console.log("(" + (i + 1) + ") eat " + ghosts[i].name + " (edible)");
   }
  }
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

function eatPowerPellet() {
  if (powerPellets === 0) {
    console.log('\nThere are no more Power Pellets left!');
  } else {
  powerPellets -= 1;
  console.log('\nYou got POWER!!!');
  score += 50;
  for (var i = 0; i < ghosts.length; i++){
    ghosts[i].edible = true;
    }
  }
}

function eatGhost(num) {
  if (ghosts[num].edible === false) {
    lives = lives - 1;
    console.log('\nYou were killed by a ' + ghosts[num].colour + " ghost named " + ghosts[num].name + ".");
    if (lives === 0){
      process.exit();
    }
}  else {
  ghosts[num].edible = false;
  console.log('\nYou ate a ' + ghosts[num].character + " ghost!");
  score += 200;
  }
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
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(0);
      break;
    case '2':
      eatGhost(1);
      break;
    case '3':
      eatGhost(2);
      break;
    case '4':
      eatGhost(3);
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
