var flag =false;
var code =[];
var codeInput =[];
var lvl =0;


document.addEventListener("keypress", function(event){
  // console.log(event.key);
  if(flag === false){
    initial_level(event.key.toLowerCase());
    console.log(keyGenerator());
    flag =true;
  }
});

window.addEventListener('load', function(){ // on page load

    document.body.addEventListener('touchstart', function(e){
        alert(e.changedTouches[0].pageX) // alert pageX coordinate of touch point
    }, false)

}, false)
// document.addEventListener('touchstart', function(e) {
//     e.preventDefault();
//     var touch = e.touches[0];
//     alert(touch.pageX + " - " + touch.pageY);
//     if(flag === false && touch.length>0){
//       initial_level(event.key.toLowerCase());
//       console.log(keyGenerator());
//       flag =true;
//     }
// }, false);


function initial_level(key){
  if(key !=null){
    lvl++;
    $("h1").text("Level "+lvl);
  }else{
    $("h1").text("Press any key to start!");
  }
}

function nextLevel(){
  lvl++;
  $("h1").text("Level "+lvl);
    // console.log("code: "+code);
    // console.log("codeInput: "+codeInput);
}

$("button").click(function(event){
  var e =event.target.id;
  var errorChecker =false;
  codeInput.push(e);
  for(var i=0; i<=code.length; i++){
      var a =codeInput;
      var b =code;
      var n = a[i].localeCompare(b[i]);
      if(a[0] === b[0] && a[1]===b[1]){
        errorChecker =false;
      }else{
        errorChecker =true;
      }

      //console.log(n);
      if( n===0 ){
        if(errorChecker===false && code.length===codeInput.length){
          nextLevel();
          keyGenerator();
          codeInput =[];
          console.log("codeInput: "+codeInput);
          // play success sound()
        }
      }else{
        errorChecker =true;
        code =[];
        $("h1").text("Game Over! Press any key restart.");
        var error =new Audio("sounds/beep-03.mp3");
        error.play();
        document.addEventListener("keypress", function(event){
          // console.log(event.key);
          location.reload();
        });
      }
  }
});

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

function btnAnimate(Key){
  document.querySelector("#"+Key).classList.remove("pressed");
  setTimeout( function(){document.querySelector("#"+Key).classList.add("pressed");}, 100);
  setTimeout( function(){document.querySelector("#"+Key).classList.remove("pressed");}, 300);
  setTimeout( function(){document.querySelector("#"+Key).classList.add("pressed");}, 100);
  setTimeout( function(){document.querySelector("#"+Key).classList.remove("pressed");}, 300);
}

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
