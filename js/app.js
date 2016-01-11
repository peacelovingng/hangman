window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint;            // Word getHint
  var word;               // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      myButtons.appendChild(letters);
      letters.appendChild(list);
      check();
      if (isVovel(alphabet[i])){
        if (word.split('').indexOf(alphabet[i].toLowerCase()) !== -1){
          list.click();
        } else{
          list.setAttribute("class", "active");
          list.onclick = null;
        }
      }
    }
  }
    
  
  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Films";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Cities";
    } else if (chosenCategory === categories[3]) {
      catagoryName.innerHTML = "The Chosen Category Is Countries";
    } else if (chosenCategory === categories[4]) {
      catagoryName.innerHTML = "The Chosen Category Is Cricket Teams";
    }
  }
  isVovel = function (c) {
      return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
  }
  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }
      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
   comments = function () {
    heart = "&#x2764;"
    showLives.innerHTML = ""
    for (var i=0; i<lives; i++){
      showLives.innerHTML += "&#x2764;";
    }
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
      document.getElementById('winloose').src = "http://data.whicdn.com/images/51332573/large.gif";
      document.getElementsByTagName("h2")[0].innerHTML = "Game Over!"
      document.getElementById('modal').click();
      document.getElementById('reset').click();
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Won!";
        document.getElementById('winloose').src = '';
        document.getElementById('winloose').src = "http://i.giphy.com/9RPcZ1p3yCxtC.gif";
        document.getElementsByTagName("h2")[0].innerHTML = "You Won!"
        document.getElementById('modal').click();
        document.getElementById('reset').click();
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  
   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    draw (0, 150, 150, 150);
    draw (10, 0, 10, 600);
    draw (0, 5, 70, 5);
    draw (60, 5, 60, 15);
  };
  
    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
      draw (60, 36, 60, 70);
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
  }
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm, head]; 


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
  
    
  // Play
  play = function () {
    categories = [
        ["everton", "liverpool", "swansea", "chelsea", "manchester-city"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"],
        ["pakistan", "russia", "china", "australia", "india"],
        ["pakistan", "ireland", "south-africa", "australia", "india"]
    ];

    chosenCategory = categories[document.getElementById("CatList").selectedIndex];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);

    geusses = [ ];
    lives = 5;
    counter = 0;
    space = 0;
    result();
    buttons();
    comments();
    selectCat();
    canvas();
  }

  play();
  
  // Hint

    hint.onclick = function() {

    hints = [
        ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"],
        ["The best country in the world", "The biggest Country?", "USA's rival", "Kangaroos?", "Home to spices"],
        ["The best country in the world", "Ireland :P", "Birth place of Human rights movement", "Kangaroos?", "Home to spices"],
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "Clue -";
    context.clearRect(0, 0, 400, 400);
    play();
  }
  document.getElementById('CatList').onchange = function(){
    document.getElementById('reset').click();
  }
}


