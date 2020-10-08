// DOM variables
let meeples = document.querySelectorAll(".meeple");
let seesaw = document.getElementById("seesaw");
let weighBtn = document.getElementById("weighBtn");
let remainingCount = document.getElementById("remainingCount");
let canvasContainer = document.getElementById("canvasContainer");
let firstCanvas = document.getElementById("firstCanvas");
let secondCanvas = document.getElementById("secondCanvas");
let radioGuess = document.querySelectorAll(".radio-weight");
let newGameBtn = document.getElementById("newGame");
let meepleHolder = document.getElementById("meepleHolder");
let resetMeepleBtn = document.getElementById("resetMeeples");
let guessForm = document.getElementById("guessForm");
let sign = document.getElementById("sign");
let startBtn = document.getElementById("getStarted");
let clouds = document.getElementById("clouds");
let introText = document.getElementById("introText");
let skyInstructions = document.getElementById("skyInstructions")
let nav = document.getElementById("nav");

// JS Variables
const meepleLocations = [];
let remaining = 3;
let target = Math.floor(Math.random() * meeples.length);
let weight = Math.floor(Math.random() * 2) + 1;
let guessedMeeple;
let z = 0;

// Start game
startBtn.addEventListener("click", startGame);

// New game
newGameBtn.addEventListener("click", newGame);

// Reset meeples
resetMeepleBtn.addEventListener("click", meepleStart);

// Weight on left and right
weighBtn.addEventListener("click", checkWeight);

// Notepad
let openNotepad = document.getElementById("openNotepad");
let notepad = document.getElementById("notepad");
let notepadClose = document.getElementById("notepadClose");
let notepadInput = document.getElementById("notepadInput").value;

// Toggle notepad
openNotepad.addEventListener("click", toggleNotepad);
notepadClose.addEventListener("click", toggleNotepad);

function toggleNotepad() {
  notepad.classList.toggle("hidden");
}

// View solution
let viewSolution = document.getElementById("viewSolution");
let solution = document.getElementById("solution");

viewSolution.addEventListener("click", function() {
  solution.classList.toggle("hidden");
})



////////////////////////////////////// Functions ////////////////////////////////////////////

// Start game --> move sign out of way
function startGame () {

  sign.style.transform = "translatey(-700px)";

  introText.classList.add("hidden");


  // setTimeout(function() {

  //   document.body.style.transition = "3500ms transform ease-in-out";
  //   document.body.style.transform = "translatey(-100vh)";
  //   setTimeout(function() {
  //     document.body.style.transition = "0";
  //     skyInstructions.style.opacity = "1";
  //     setTimeout(function() {
  //       nav.style.opacity = "1";
  //     }, 1500);
  //   }, 3500);

  // }, 1500);

}




// Meeples | start position
function meepleStart () {

  let t = 0;
  let movedMeeples = [];

  // Get all meeples that have moved from starting position
  for (let i = 0; i < meeples.length; i++) {

    if (meeples[i].getAttribute('data-x') != null && (meeples[i].getAttribute('data-x') != 0 || meeples[i].getAttribute('data-y') != 0)) {
      movedMeeples.push(meeples[i]);
    };
  };
  
  // Reset moved meeples to start position
  for (let i = 0; i < movedMeeples.length; i++) {

    // Timer to fan them back in order
    setTimeout(function() {
      movedMeeples[i].style.transition = "500ms all ease-in-out";
      movedMeeples[i].style.transform = "translate(0, 0)";
      movedMeeples[i].setAttribute('data-x', 0);
      movedMeeples[i].setAttribute('data-y', 0);
      setTimeout(function() {
        movedMeeples[i].style.transition = "0ms";
      }, 500);
    }, t);

    t += 100;
     
    // Remove left/right class
    for (let i = 0; i < meeples.length; i++) {
      meeples[i].className = "meeple drag-drop";
    };
  };
};

// Start a new game
function newGame() {

  // Decide heavier/lighter meeple | 1 = lighter, 2 = heavier
  target = Math.floor(Math.random() * meeples.length);
  weight = Math.floor(Math.random() * 2) + 1;

  // Meeple starting positions
  meepleStart();

  // Reset moves count
  remaining = 3;
  remainingCount.innerHTML = remaining;

  // Clear canvas
  while (firstCanvas.firstChild) {
    firstCanvas.removeChild(firstCanvas.lastChild);
  };
  while (secondCanvas.firstChild) {
    secondCanvas.removeChild(secondCanvas.lastChild);
  };

  // Remove seesaw and meeple classes
  seesaw.className = "wobble-group";

  // Reset guess form
  guessContainer.classList.add("hidden");
  guessForm.reset();

  skyInstructions.style.display = "block";
  setTimeout(function() {
    skyInstructions.style.opacity = "1";
  }, 1);

}




// Check weight
function checkWeight() {

  if (remaining === 3) {
    skyInstructions.style.opacity = "0";
    setTimeout(function() {
      skyInstructions.style.display = "none";
    }, 250);

  }

  if (remaining === 0) {
    return;
  }

  // Count on each side
  let leftNo = 0;
  let rightNo = 0;
  let leftWeight = 0;
  let rightWeight = 0;

  // Loop through each meeple
  for (let i = 0; i < meeples.length; i++) {

    // If contains left class --> add to left total
    if (meeples[i].classList.contains("dropped-left")) {

      if (i === target) {
        leftWeight = weight;
      } 

      leftNo++;
    }

    // If it contains right class --> add to right total

    else if (meeples[i].classList.contains("dropped-right")) {

      if (i === target) {
        rightWeight = weight;
      }

      rightNo++;
    };
  };

  checkEven(leftNo, rightNo, leftWeight, rightWeight);
}



// Check left and right have same number of villagers
function checkEven(leftNo, rightNo, leftWeight, rightWeight) {
  if (leftNo !== rightNo) {
    alert("Not even!");
    return;
  }

  else if (leftNo === 0) {
    alert("No villagers to weigh!");
    return;
  }

  else {
    useSeesaw(leftWeight, rightWeight);
  }
}


// Move the seesaw depending on weight
function useSeesaw(leftWeight, rightWeight) {

  for (var i = 0; i < meeples.length; i++) {
    if (!meeples[i].classList.contains("dropped-left") && !meeples[i].classList.contains("dropped-right")) {
      meeples[i].classList.add("meeple-hidden");
    };
  };

  seesaw.className = "wobble-group";
  let outcome;

  setTimeout(function() {

    let lastWeigh = "";

    if (remaining === 1) {
      lastWeigh = "last-";
    }
    // Balance
    if (leftWeight === rightWeight) {
      seesaw.classList.add(`${lastWeigh}wobble`);
      outcome = "even";
    }

    // Left heavier
    else if (leftWeight > rightWeight) {
      seesaw.classList.add(`${lastWeigh}heavier`);
      outcome = "heavier";
    }
    // Right heavier
    else {
      seesaw.classList.add(`${lastWeigh}lighter`);
      outcome = "lighter";
    }

    saveHistory(outcome);

  }, 159);
  
}


function generateCanvas (canvasNo, outcome) {

  html2canvas(document.querySelector("#capture"), {
    scrollY: -window.scrollY,
    backgroundColor: null,
    removeContainer: false,
    ignoreElements: function (element) {

      if (element.classList.contains("meeple")) {
        if (!element.classList.contains("dropped-left") && !element.classList.contains("dropped-right")) {
          return true;
        } else {
          return false;
        }
      }
      
    }
  }).then(canvas => {
    canvasNo.appendChild(canvas);
    canvasNo.childNodes[3].classList.add(`canvas-${outcome}`);
  });  

}

// Screenshot last move
function saveHistory(outcome) {


  if (remaining === 3) {
    setTimeout(function() {
      canvasContainer.style.opacity = "1";
      canvasContainer.childNodes[3].style.opacity = "1";
    }, 3000);
    generateCanvas(firstCanvas, outcome);
  }

  else if (remaining === 2) {
    setTimeout(function() {generateCanvas(secondCanvas, outcome)}, 3000);
  }

  remaining--;
  if (remaining === 0) {
    meepleHolder.style.display = "none";
    weighBtn.classList.add("hidden");
  }

  setTimeout(function() {
    for (let i = 0; i < meeples.length; i++) {
      meeples[i].classList.remove("meeple-hidden");
    };
    seesaw.classList.remove("wobble");
    seesaw.classList.remove("heavier");
    seesaw.classList.remove("lighter");
  }, 4500);

  // Update text for remaining
  remainingCount.innerHTML = remaining;
 
}

// Keep this - this is for actually dragging
function dragMoveListener (event) {
  var target = event.target

  target.classList.remove("dropped-left");
  target.classList.remove("dropped-right");
  target.classList.remove("dropped-guess");

  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

};

// Dropzone
interact('.dropzone').dropzone({
  overlap: 0.5,

  // listen for drop related events:

  ondropactivate: function (event) {
    // When you start dragging, style the landing zones
    event.target.classList.add('drop-active')
  },


  ondragenter: function (event) {
    // Triggers when hovering drop zone
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    // Grey dotted border
    dropzoneElement.classList.add('drop-target')
    // Green draggable
    draggableElement.classList.add('can-drop')

  },



  ondragleave: function (event) {
    // When leaving hovering dropzone
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },


  ondrop: function (event) {
    // When dropping into dropzone
    if (event.target.classList.contains("dropzone-left")) {
      event.relatedTarget.classList.add("dropped-left");
    } 

    else if (event.target.classList.contains("dropzone-right")) {
      event.relatedTarget.classList.add("dropped-right");
    }

    else if (event.target.classList.contains("dropzone-guess")) {
      for (let i = 0; i < meeples.length; i++) {
        meeples[i].classList.remove("dropped-guess");
      }
      event.relatedTarget.classList.add("dropped-guess");
    }
  },
  ondropdeactivate: function (event) {
    // Any time it's dropped
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.drag-drop')

.draggable({
  inertia: false,
  listeners: { move: dragMoveListener }
})



// Open guess form
let guessBtn = document.getElementById("guess");
let guessContainer = document.getElementById("guessContainer");
let guessSub = document.getElementById("submitGuess");

guessBtn.addEventListener("click", function() {
  guessContainer.classList.toggle("hidden");
});

// Submit guess
guessSub.addEventListener("click", function() {

  // Find the guessed meeple
  for (let i = 0; i < meeples.length; i++) {
    if (meeples[i].classList.contains("dropped-guess")) {

      // If guessed meeple is correct
      if (i == target) {
        
        // Check weight guess
        for (let i = 0; i < radioGuess.length; i++) {

          if (radioGuess[i].checked) {

            // Correct weight
            if (radioGuess[i].value == weight) {
              alert("Correct!");
              return;
            }
            // Incorrect weight
            else {
              alert("Incorrect! You had the right meeple, but the incorrect weight!");
              return;
            };
          };
        };
      };
    };
  };

  alert("Incorrect! Sorry!");
  return;
})