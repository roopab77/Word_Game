//create an array of words 
var colleges = ["JOHNS-HOPKINS", "OXFORD", "PRINCETON", "RENSSELAER"];
var collegesOBJ = [
{name: "JOHNS-HOPKINS", image: "../Word_Game/assets/images/johnshopkins.jpg"},
{name: "OXFORD", image: "../Word_Game/assets/images/oxford.jpg"},
{name: "PRINCETON", image:"../Word_Game/assets/images/princeton.jpg"},
{name: "RENSSELAER", image: "../Word_Game/assets/images/renselear.jpg" }
];
var answer = [];
var placeholder;
var arrayitem = "";
var answerasDisplay = [];
var guessesSoFar = [];
var justDashes = [];
var guessesRemaining = 20;
var winflag = false;

//var answerasDisplay


// randomly choose the array of words 
function chooseArrayRandom() {
  
  //var item = colleges[Math.floor(Math.random() * colleges.length)];
  var item = collegesOBJ[Math.floor(Math.random()* collegesOBJ.length)];
  var answer = [];
  for (var i = 0; i < item.name.length; i++) {
    if (item.name.substring(i, i + 1) === " ") {
      answer[i] = " ";
    } else {
      answer[i] = "_";
    }
  }

  answerasDisplay = answer.join(' ');
  $("#word_toguess").text(answerasDisplay);
  document.getElementById("coll_image").src = item.image;

  //console.log(item);
  return item.name;
}

 


//when start button clicked pick a random item from array count the number of letters and display the dashes on the html page

$("#Btn_start").on("click", function () {
  //alert("I've been clicked!");
  var newarray = [];
  document.getElementById("you_win").style.visibility = "hidden";
  document.getElementById("guesses_left").textContent = 20;
  document.getElementById("words_guessed").textContent = newarray;
  guessesSoFar = [];
  justDashes=[];
  winflag = false;
  arrayitem = chooseArrayRandom();
  //alert(arrayitem);
  guessesRemaining = 20;
  console.log(arrayitem);
  //var answer = [];
 
});

document.onkeyup = function (event) {

  if(winflag == false && guessesRemaining > 0)
  {
  var keyPressed = event.key.toUpperCase();
  guessesSoFar.push(keyPressed);
  guessesRemaining --;
  document.getElementById("guesses_left").textContent = guessesRemaining;
  if(guessesRemaining > 0)
  {
  document.getElementById("words_guessed").textContent = guessesSoFar;
  if (arrayitem.includes(keyPressed) == true) {

    //find out what all positions have the key pressed
    var indices = [];
    for (var i = 0; i < arrayitem.length; i++) {
      if(typeof justDashes[i] == "undefined")
      {
      justDashes[i]= ("_");
      }
      if (arrayitem[i] === keyPressed) indices.push(i);
    }

    
    //now that you know the position of the array replace the dashes with alphabets
    for (var j = 0; j < indices.length; j++) {
      for (var i = 0; i < arrayitem.length; i++) {
        if (i == indices[j]) {
          justDashes[i] = keyPressed;

        }

      }
    }

    //push it to the html page
    var newanswer = justDashes.join(' ');
    $("#word_toguess").text(newanswer);
    var toCheck = justDashes.join('');
    if(arrayitem === toCheck)
    { winflag = true;
      document.getElementById("you_win").style.visibility = "visible";
      document.getElementById("messages").textContent = "You Won. Press Start button for a new game.";
      document.getElementById("score").textContent = parseInt(document.getElementById("score").textContent) + 1;
    }
  }

  }
  else{
    document.getElementById("messages").textContent = "You have crossed your guess limit";
  }
}
}