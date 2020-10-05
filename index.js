var flag =false;
var code =[];
var codeInput =[];
var lvl =0;
var errorChecker =false;

// ----- Random key generator ----------------------------------------//
function keyGenerator(){
  var letter ="";
  var ran =Math.random();
  ran =Math.round(ran*3)+1;
  if(ran === 1){
    letter ="a";
  }else if(ran ===2){
    letter ="b";
  }
  else if(ran ===3){
    letter ="c";
  }else if(ran ===4){
    letter ="d";
  }
  code.push(letter);
  btnAnimate(letter);
  sound(letter);
  return code;
}
// -------------------------------------------------------------------//

// ----- Detect touch event for Touch enabled device -----------------//

function touchstart(e){
  //e.preventDefault();
  var target =e.target;
  var touch =e.touches[0];
  target.addEventListener('touchend', function(){
      if(flag ===false){
        initial_level("0");
        console.log(keyGenerator());
      }
      flag =true;
  }, false);
}
document.addEventListener('touchstart', touchstart, false);
// -------------------------------------------------------------------//

// ----- key press event listener ------------------------------------//
document.addEventListener("keypress", function(event){
  // console.log(event.key);
  if(flag === false){
    initial_level(event.key.toLowerCase());
    console.log(keyGenerator());
    flag =true;
  }
});
// -------------------------------------------------------------------//

// ----- Intitial defaults -------------------------------------------//
function initial_level(key){
  if(key !=null){
    $("h1").text("Level 1");
  } else {
    $("h1").text("Press any key to start!");
  }
}
// -------------------------------------------------------------------//

// ----- Level Up ----------------------------------------------------//
function nextLevel(){
  lvl++;
  $("h1").text("Level "+lvl);
}
// -------------------------------------------------------------------//

// ----- Button event listener ---------------------------------------//
$("button").click(function(event){
  var e =event.target.id;
  codeInput.push(e);
  // disable buttons during first load
  if(flag ===false){
    e.preventDefault();
    $(this).prop('disabled', true);
  }else{
    $(this).prop('disabled', false);
  }

  for(var i=0; i<=code.length; i++){
      var a =codeInput;
      var b =code;
      // ----- compare random code to code input ----------------------//
      var n = a[i].localeCompare(b[i]);

      // ----- n=0[equal], n=-1[not equal, n=1[not equal]] ------------//
      if( n === 0 ){
        if(errorChecker===false && code.length===codeInput.length){
          nextLevel();
          keyGenerator();
          codeInput =[];
          console.log("codeInput: "+codeInput);
        }
      } else {
        errorChecker =true;
        lvl =1;
        flag =false;
        // ----- Game over sound -------------------------------------//
        $("h1").text("Game Over! Press any key restart.");
        var error =new Audio("sounds/beep-03.mp3");
        error.play();
        // ----- Detect keypress event to restart game ---------------//
        document.addEventListener("keypress", function (event) {
          location.reload();
          document.querySelector("button").classList.remove("pressed");
          //code =[];
        });
      }
  }
});
// -------------------------------------------------------------------//

// ----- Button animation --------------------------------------------//
function btnAnimate(Key){
  document.querySelector("#"+Key).classList.remove("pressed");
  setTimeout( function(){document.querySelector("#"+Key).classList.add("pressed");}, 100);
  setTimeout( function(){document.querySelector("#"+Key).classList.remove("pressed");}, 300);
  setTimeout( function(){document.querySelector("#"+Key).classList.add("pressed");}, 100);
  setTimeout( function(){document.querySelector("#"+Key).classList.remove("pressed");}, 300);
}
// -------------------------------------------------------------------//

// ----- Play sound  -------------------------------------------------//
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
// -------------------------------------------------------------------//
