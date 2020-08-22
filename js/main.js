var checkTime;
var curMenu = 'mainMenu';
var curGame = 0;
var games = document.getElementsByClassName('mainGame');

var JUMP_JUMP = 0;

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

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

var jumpUpTimer;
var jumpDownTimer;
var larvaMoveTimer;
var me, larva;

function makeLarva() {
  larva = document.createElement('div');
  larva.className = 'larva';
  larva.id = 'larva';
  document.body.appendChild(larva);
  larva.innerHTML = `<img src='./images/larva.png' border=0 width=100>`;

  larvaMoveTimer = setInterval(function() {
    let originalPos = getOffset(larva);
    if (originalPos.left < -200)
      originalPos.left = 1700;
    larva.style.left = (originalPos.left - 15) + 'px';
    checkCrash();
  }, 100);
}

function checkCrash() {
  var meOffset = getOffset(me);
  var larvaOffset = getOffset(larva);

  var gapTop = Math.abs(meOffset.top - larvaOffset.top);
  var gapLeft = Math.abs(meOffset.left - larvaOffset.left);
  console.log(gapTop + ' ' + gapLeft);
  if (gapLeft < 70) {
    if (gapTop < 200) {
      console.log('crash!!!!')
      clearInterval(jumpUpTimer);
      clearInterval(jumpDownTimer);
      clearInterval(larvaMoveTimer);
    }
  }
}

function jumpUp() {
  var cnt = 100;
  var jumpUpTimer = setInterval(function() {
    let originalPos = getOffset(me);
    me.style.top = (originalPos.top - 2) + 'px';
    cnt--;
    if (cnt == 0) {
      clearInterval(jumpUpTimer);
      jumpDown();
    }
  }, 10);
}

function jumpDown() {
  var cnt = 100;
  var jumpDownTimer = setInterval(function() {
    let originalPos = getOffset(me);
    me.style.top = (originalPos.top + 2) + 'px';
    cnt--;
    if (cnt == 0) {
      clearInterval(jumpDownTimer);
    }
  }, 10);
}

function playJumpJump() {
  me = document.createElement('div');
  me.className = 'me';
  me.id = 'me';
  document.body.appendChild(me);
  me.innerHTML = `<img src='./images/jump_character.png' border=0 width=200>`;

  makeLarva();
}

function showGameMain() {
  document.getElementById('main_menu').style.display = 'none';
  document.getElementById('game_main').style.display = 'block';

  if (curGame == JUMP_JUMP) {
    playJumpJump();
  }
}

function setBackgroundImage() {
  console.log(`setBackgroundImage() : ${curGame}`);
  if (curGame == JUMP_JUMP) {
    document.body.style.backgroundImage = `url('./images/jump_background.png')`;
  }
}

function selectGame() {
  showGameMain();
  setBackgroundImage();

  curMenu = 'game';
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
    } else if (curGame == JUMP_JUMP) {
      switch (e.keyCode) {
        case 37: //LEFT arrow
          break;
        case 38: //UP arrow
          jumpUp();
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
