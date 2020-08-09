var checkTime;
var curMenu = 'mainMenu';
var curGame = 0;
var games = document.getElementsByClassName('mainGame');

function showLoading() {
  document.getElementById('div_loading').style.display = 'block';
  document.body.style.backgroundImage = `url('./images/background.png')`;
}

function setBorderSelectedGame(dir) {
  games[curGame].style.border = '7px black solid';
  if (dir == 'left') curGame--;
  else if (dir == 'right') curGame++;
  if (curGame == games.length) {
    curGame = 0;
  }
  if (curGame < 0) {
    curGame = games.length - 1;
  }
  games[curGame].style.border = '7px gold dotted';
}

function showFirstMenu() {
  console.log('showFirstMenu()');
  document.getElementById('div_loading').style.display = 'none';
  document.getElementById('main_menu').style.display = 'block';
  curMenu = 'mainMenu';

  setBorderSelectedGame(curGame);
}

function showGameMain() {
  document.getElementById('main_menu').style.display = 'none';
  document.getElementById('game_main').style.display = 'block';  
}

function setBackgroundImage() {
  console.log(`setBackgroundImage() : ${curGame}`);
  if (curGame == 0) { // jump jump
    document.body.style.backgroundImage = `url('./images/jump_background.png')`;
  }
}

function selectGame() {
  showGameMain();
  setBackgroundImage();
}

//Initialize function
var init = function () {
  // TODO:: Do your initialization job
  console.log('init() called');
  showLoading();
  setTimeout('showFirstMenu()', 3000);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      // Something you want to do when hide or exit.
    } else {
      // Something you want to do when resume.
    }
  });

  // add eventListener for keydown
  document.addEventListener('keydown', function (e) {
    if (curMenu == 'mainMenu') {
      switch (e.keyCode) {
        case 37: //LEFT arrow
          setBorderSelectedGame('left');
          break;
        case 39: //RIGHT arrow
          setBorderSelectedGame('right');
          break;
        case 13: //OK
          selectGame();
          break;
        case 10009: //RETURN button
          tizen.application.getCurrentApplication().exit();
          break;
        default:
          console.log('Key code : ' + e.keyCode);
          break;
      }
    } else {
      switch (e.keyCode) {
        case 37: //LEFT arrow
          break;
        case 38: //UP arrow
          break;
        case 39: //RIGHT arrow
          break;
        case 40: //DOWN arrow
          break;
        case 13: //OK button
          break;
        case 10009: //RETURN button
          tizen.application.getCurrentApplication().exit();
          break;
        default:
          console.log('Key code : ' + e.keyCode);
          break;
      }
    }
  });
};
// window.onload can work without <body onload="">
window.onload = init;

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('divbutton1').innerHTML = 'Current time: ' + h + ':' + m + ':' + s;
  setTimeout(startTime, 10);
}

function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}
