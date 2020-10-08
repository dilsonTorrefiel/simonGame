var flag =false;
var code =[];
var codeInput =[];
var lvl =0;
var errorChecker =false;
var errorSound;

// Detect touch event for Touch enabled device
function touchstart(e){
  //e.preventDefault();
  var target =e.target;
  var touch =e.touches[0];
  target.addEventListener('touchend', function(){
      if(errorChecker === true){
        window.location.reload();
      }
      if(flag ===false && errorChecker === false){
        nextLevel();
        console.log(keyGenerator());
        flag =true;
      }
  }, false);
}
document.addEventListener('touchstart', touchstart, false);

// key press event listener
document.addEventListener("keypress", function(event){
  // console.log(event.key);
  if(flag === false){
    initial_level(event.key.toLowerCase());
    console.log(keyGenerator());
    flag =true;
  }
});

// Intitial defaults
function initial_level(key){
  if(key !=null){
    lvl++;
    $("h1").text("Level "+lvl);
  } else {
    $("h1").text("Press any key to start!");
  }
}

// Level Up
function nextLevel(){
  lvl++;
  $("h1").text("Level "+lvl);
}

// Button event listener
$("button").click(function(event){
  var e =event.target.id;
  console.log(event);
  codeInput.push(e);
  // disable buttons during first load
  if(flag ===false){
    e.preventDefault();
    $(this).prop('disabled', true);
  }else{
    $(this).prop('disabled', false);
  }

  for(var i=0; i<=code.length; i++){
      // ----- compare random code to code input ----------------------//
      var n = codeInput[i].localeCompare(code[i]);
      switch(n){
        case 0:
            if((errorChecker === false) && (code.length === codeInput.length)){
              nextLevel();
              keyGenerator();
              setTimeout( function(){codeInput =[];}, 50);
            }
            break;

        case -1:
            errorChecker =true;
            flag =false;
            // ----- Game over sound -------------------------------------//
            $("h1").text("Game Over! Press any key restart.");
            errorSound =new Audio("sounds/beep-03.mp3");
            errorSound.play();
            // ----- Detect keypress event to restart game ---------------//
            document.addEventListener("keypress", function (event) {
              window.location.reload();
            });
            break;

        case 1:
            errorChecker =true;
            flag =false;
            // ----- Game over sound -------------------------------------//
            $("h1").text("Game Over! Press any key restart.");
            errorSound =new Audio("sounds/beep-03.mp3");
            errorSound.play();
            // ----- Detect keypress event to restart game ---------------//
            document.addEventListener("keypress", function (event) {
              window.location.reload();
            });
            break;

        default:
            errorChecker =true;
      }
  }
});

// Random key generator
function keyGenerator(){
  var ran =Math.random();
  ran =Math.round(ran*3)+1;
  var key;
  switch(ran){
    case 1:
      key ="a";
      break;
    case 2:
      key ="b";
      break;
    case 3:
      key ="c";
      break;
    case 4:
      key ="d";
      break;
    default:
      key ="";
  }
  code.push(key);
  btnAnimate(key);
  sound(key);
  return code;
}

// Button animation
function btnAnimate(Key){
  document.querySelector("#"+Key).classList.add("pressed");
  setTimeout( function(){document.querySelector("#"+Key).classList.remove("pressed");}, 500);
}

// Play sound
function sound(key){
  if(key ==="a"){
    var buttonA =new Audio("sounds/button-1.mp3");
    buttonA.play();
  }else if(key ==="b"){
    var buttonB =new Audio("sounds/button-3.mp3");
    buttonB.play();
  }else if(key ==="c"){
    var buttonC =new Audio("sounds/button-6.mp3");
    buttonC.play();
  }else if(key ==="d"){
    var buttonD =new Audio("sounds/button-7.mp3");
    buttonD.play();
  }
}
