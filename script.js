// DOM variables
let homePage = document.getElementById("homePage");
let gameArea = document.getElementById("gameArea");
let meeples = document.querySelectorAll(".meeple");
let seesaw = document.getElementById("seesaw");
let weighBtn = document.getElementById("weighBtn");
let weighBtnHolder = document.getElementById("weighBtnHolder");
let remainingCount = document.getElementById("remainingCount");
let historyContainer = document.getElementById("historyContainer");
let firstHistory = document.getElementById("firstHistory");
let secondHistory = document.getElementById("secondHistory");
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
let openNotepad = document.getElementById("openNotepad");
let notepad = document.getElementById("notepad");
let notepadCover = document.getElementById("notepadCover");
let notepadBack = document.getElementById("notepadBack");
let notepadClose = document.getElementById("notepadClose");
let notepadInput = document.getElementById("notepadInput");
let notepadPages = document.querySelectorAll(".flip-page");
let viewSolution = document.getElementById("viewSolution");
let solution = document.getElementById("solution");
let solutionInfo = document.getElementById("solutionInfo");
let solutionClose = document.getElementById("solutionClose");
let guessBtn = document.getElementById("guess");
let guessContainer = document.getElementById("guessContainer");
let guessSub = document.getElementById("submitGuess");
let FH_template = document.getElementById("FH_template");
let RH_template = document.getElementById("SH_template");
let preventClick = document.getElementById("preventClick");


// Meeples from history template
let FH_leftMeeples = document.querySelectorAll(".FH_left-meeple");
let FH_rightMeeples = document.querySelectorAll(".FH_right-meeple");

let SH_leftMeeples = document.querySelectorAll(".SH_left-meeple");
let SH_rightMeeples = document.querySelectorAll(".SH_right-meeple");

// JS Variables
const meepleLocations = [];
let remaining = 3;
let target = Math.floor(Math.random() * meeples.length);
let weight = Math.floor(Math.random() * 2) + 1;
let guessedMeeple;
let z = 0;
let notepadOpen = false;

// Reset body position on page refresh - MIGHT NOT NEED THIS
// window.onbeforeunload = function () {
//   homeArea.style.transition = "0ms";
//   gameArea.style.transition = "0ms";
//   homeArea.style.transform = "translatey(0)";
//   gameArea.style.transform = "translatey(100vh)";
// }

// Start game
startBtn.addEventListener("click", startGame);

// New game
newGameBtn.addEventListener("click", newGame);

// Reset meeples
resetMeepleBtn.addEventListener("click", meepleStart);

// Weight on left and right
weighBtn.addEventListener("click", checkWeight);

// Toggle notepad
openNotepad.addEventListener("click", toggleNotepad);
notepadClose.addEventListener("click", toggleNotepad);

// View solution
viewSolution.addEventListener("click", () => toggleVisible(solution));

// Close solution
solution.addEventListener("click", (e) => {
  if (e.target.contains(solutionInfo) || e.target.contains(solutionClose)) {
    toggleVisible(solution)
  }
});

// Show make guess button
guessBtn.addEventListener("click", () => toggleVisible(guessContainer));

// Submit guess
//guessSub.addEventListener("click", makeGuess);

document.body.addEventListener("click", (e) => {
  if (e.target == notepadInput) {
    e.preventDefault;
  }
});


////////////////////////////////////// Functions ////////////////////////////////////////////

// Move to game area
function appHeight () {
  document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`)
  window.addEventListener('resize', appHeight)
} 
appHeight()

// Move back to home page on window reload



function makeInvisible () {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].classList.remove("visible");
    arguments[i].classList.add("invisible");
  }
}

function makeVisible () {
  for (let i = 0; i < arguments.length; i++) {

    if (arguments[i].classList.contains("invisible")) {3

      arguments[i].classList.remove("invisible");
      arguments[i].classList.add("visible");

      setTimeout(() => {
        arguments[i].classList.remove("visible");
      }, 251);
    }
  }
}


function startGame () {
  // Move sign + hide intro/button
  sign.style.transform = "translatey(-700px)";
  makeInvisible(introText, startBtn);


  setTimeout(() => {
    document.getElementById("homePage").classList.add("move-pages");
    document.getElementById("gameArea").classList.add("move-pages");
    setTimeout(() => {
      makeVisible(nav);
      makeVisible(skyInstructions);
    }, 4000);

  }, 1500);

}

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

    // Timer to stagger recall of meeples
    setTimeout(() => {
      movedMeeples[i].style.transition = "500ms all ease-in-out";
      movedMeeples[i].style.transform = "translate(0, 0)";
      movedMeeples[i].setAttribute('data-x', 0);
      movedMeeples[i].setAttribute('data-y', 0);

      // Reset transition to 0ms so dragging works
      setTimeout(() => {
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
  remainingCount.innerHTML = `${remaining} uses remaining`;

  // Clear history
  clearHistory();


  // Remove seesaw and meeple classes
  seesaw.className = "seesaw-and-meeples";

  // Reset guess form
  guessContainer.classList.add("hidden");
  guessForm.reset();

  makeVisible(skyInstructions);

}

// Clear history
function clearHistory() {

  firstHistory.classList.add("invisible");
  secondHistory.classList.add("invisible");

  setTimeout(() => {
    clearMeeples(FH_leftMeeples, FH_rightMeeples, SH_leftMeeples, SH_rightMeeples);
    FH_template.style.transform = "rotate(0deg)";
    SH_template.style.transform = "rotate(0deg)";
  }, 250);
}

// Clear history seesaws
function clearMeeples() {

  for (let i = 0; i < arguments.length; i++) {

    for (let j = 0; j < arguments[i].length; j++) {
      arguments[i][j].style.fill = "none";
      arguments[i][j].style.stroke = "none";
      arguments[i][j].childNodes[3].childNodes[1].innerHTML = "";
      console.log(arguments[i][j].childNodes[3].classList.remove("double-digits"));
    } 

  }
}

// Check weight
function checkWeight() {

  if (remaining === 3) {
    makeInvisible(skyInstructions);
  }

  if (remaining === 0) {
    return;
  }

  // Make meeples unclickable for duration
  makeVisible(preventClick);

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
    makeInvisible(preventClick);
    alert("Not even!");
    return;
  }

  else if (leftNo === 0) {
    makeInvisible(preventClick);
    alert("No villagers to weigh!");
    return;
  }

  else {
    useSeesaw(leftWeight, rightWeight);
  }
}


// Move the seesaw depending on weight
function useSeesaw(leftWeight, rightWeight) {

  makeInvisible(weighBtnHolder);

  for (var i = 0; i < meeples.length; i++) {
    if (!meeples[i].classList.contains("dropped-left") && !meeples[i].classList.contains("dropped-right")) {
      makeInvisible(meeples[i]);
    };
  };

  seesaw.className = "seesaw-and-meeples";
  let outcome;

  setTimeout(() => {

    let lastWeigh = "";

    if (remaining === 1) {
      lastWeigh = "last-";
    }

    else if (leftWeight == 1) {
      seesaw.classList.add(`${lastWeigh}lighter`);
      outcome = "lighter";
    }
    
     else if (leftWeight == 2) {
      seesaw.classList.add(`${lastWeigh}heavier`);
      outcome = "heavier"
    }

    else if (rightWeight == 1) {
      seesaw.classList.add(`${lastWeigh}heavier`);
      outcome = "heavier";
    }

     else if (leftWeight == 2) {
      seesaw.classList.add(`${lastWeigh}lighter`);
      outcome = "lighter"
    }

    saveHistory(outcome);

  }, 159);
  
}

function generateHistory (historyNo, outcome) {

  let leftDropped = [];
  let rightDropped = [];

  for (let i = 0; i < meeples.length; i++) {
    if (meeples[i].classList.contains("dropped-left")) {
      leftDropped.push(meeples[i]);
    }

    else if (meeples[i].classList.contains("dropped-right")) {
      rightDropped.push(meeples[i]);
    }

    else {
      continue;
    };
  };

  if (historyNo === firstHistory) {

    generateHistoryMeeples(leftDropped, FH_leftMeeples, "FH_text");
    generateHistoryMeeples(rightDropped, FH_rightMeeples, "FH_text");
    rotateHistory(outcome, FH_template);
  }

  else {
    generateHistoryMeeples(leftDropped, SH_leftMeeples, "SH_text");
    generateHistoryMeeples(rightDropped, SH_rightMeeples, "SH_text");
    rotateHistory(outcome, SH_template);    
  };
};

// Style the meeples on the history canvas
function generateHistoryMeeples(droppedSide, meepleSide, textClassName) {
  for (let i = 0; i < droppedSide.length; i++) {
    if (droppedSide[i].textContent.trim().length == 2) {
      meepleSide[i].getElementsByClassName(textClassName)[0].classList.add("double-digits");
    }
    meepleSide[i].style.fill = droppedSide[i].getElementsByTagName("svg")[0].getAttribute("fill");
    meepleSide[i].style.stroke = "#fff";
    meepleSide[i].childNodes[3].childNodes[1].innerHTML = droppedSide[i].textContent.trim();
  };
};

// Rotate history canvas
function rotateHistory(outcome, template) {
  if (outcome === "heavier") {
    template.style.transform = "rotate(-20deg)";
  };

  if (outcome === "lighter") {
    template.style.transform = "rotate(20deg)";
  };
};

// Save last move to history template
function saveHistory(outcome) {

  if (remaining === 3) {
    setTimeout(() => {
      makeVisible(firstHistory);
      makeVisible(weighBtnHolder);
    }, 3000);
    generateHistory(firstHistory, outcome);
  }

  else if (remaining === 2) {
    setTimeout(() => {
      makeVisible(secondHistory);
      makeVisible(weighBtnHolder);
    }, 3000);
    generateHistory(secondHistory, outcome);
  };

  remaining--;

  if (remaining === 0) {
    weighBtnHolder.classList.add("hidden");
  };

  setTimeout(() => {
    for (let i = 0; i < meeples.length; i++) {
      makeVisible(meeples[i]);
    };
    seesaw.classList.remove("wobble");
    seesaw.classList.remove("heavier");
    seesaw.classList.remove("lighter");
    makeInvisible(preventClick);
  }, 3001);

  // Update text for remaining
  if (remaining == 1) {
    remainingCount.innerHTML = `${remaining} use remaining`;
  } else {
    remainingCount.innerHTML = `${remaining} uses remaining`;
  };
};

function toggleNotepad() {

  openNotepad.removeEventListener("click", toggleNotepad);
  notepadClose.removeEventListener("click", toggleNotepad);

  // If notepad is currently closed
  if (notepadOpen === false) {

    // Move on screen
    notepad.classList.add("notepad-move");
    notepad.childNodes[1].style.transition = "0ms";
    notepad.childNodes[1].style.transform = "translate(0, 0)";
    notepad.style.transform = "translate(0, 0)";
    notepadBack.style.animationDelay = "1ms";

    // Flip pages after movement
    setTimeout(() => {

      // Flip cover
      notepadCover.classList.remove("close-cover");
      notepadCover.classList.add("open-cover");

      // Flip pages
      for (let i = 0; i < notepadPages.length; i++) {
        notepadPages[i].classList.remove("close-notepad");
        notepadPages[i].classList.add("open-notepad");
      }
    }, 500);

    // Add event listeners back
    setTimeout(() => {
      notepadOpen = true;
      enableNotepadToggle();
    }, 1500);
  }


  // If notepad is currently open
  else if (notepadOpen === true) {

    // Flip cover
    notepadCover.classList.remove("open-cover");
    notepadCover.classList.add("close-cover");

    notepadBack.style.animationDelay = "499ms";

    // Flip pages
    for (let i = (notepadPages.length - 1); i >= 0; i--) {
      notepadPages[i].classList.remove("open-notepad");
      notepadPages[i].classList.add("close-notepad");
    };
    

    // Move off screen after closing
    setTimeout(() => {
      notepad.classList.remove("notepad-move");
      notepad.childNodes[1].style.transition = "500ms all ease-in-out";
      notepad.childNodes[1].style.transform = "translate(0, 0)";
      notepad.style.transform = "translate(600px, 0)";
      notepad.childNodes[1].setAttribute('data-x', 0);
      notepad.childNodes[1].setAttribute('data-y', 0);

    }, 1700);


    // Add event listeners back
    setTimeout(() => {
      notepadOpen = false;
      enableNotepadToggle();
      
    }, 2300);
  };
};

// Re-enable notepad movement
function enableNotepadToggle () {
  openNotepad.addEventListener("click", toggleNotepad);
  notepadClose.addEventListener("click", toggleNotepad);
};

// Toggle showing guess
function toggleVisible (el) {
  if (el.classList.contains("invisible")) {
    makeVisible(el);
  }
  else {
    makeInvisible(el);
  }
}

// Submit guess
function makeGuess () {
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
}


// MEEPLE DRAGGING
function dragMoveListener (event) {

  var target = event.target;

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
    ignoreFrom: 'input, textarea',
    listeners: { move: dragMoveListener }
  })







// Solution possible outcomes
const branches = {
  // B = balance | N = no balance

  // Balancing first page
  B: {
    title: "1<sup>st</sup> Move Balanced",
    instructions: "<p>The oddly weighted villager must be 9, 10, 11, or 12.</p><p>Weigh 1, 2, 3 against 9, 10, 11, keeping 12 aside.</p>",
    img: "b.png",
    pageNo: 2,
    last: false,

    B: {
      title: "2<sup>nd</sup> Move Balanced",
      instructions: "<p>The oddly weighted villager must be villager 12 - the only one we haven't weighed</p><p>Weigh 12 against any other villager to know if it is heavier or lighter",
      img: "bb.png",
      pageNo: 3,
      last: true
    },

    N: {
      title: "2<sup>nd</sup> Move Didn't balance",
      instructions: "<p>The oddly weighted villager is one of the three we added to the seesaw in the last step (9, 10, 11)</p><p>They are heavier or lighter depending on which way the seesaw tilted in the last weighing.<p>Weigh 9 against 10, keeping 11 aside</p>",
      img: "bn.png",
      pageNo: 3,
      last: false,

      B: {
        title: "3<sup>rd</sup> Move Balanced",
        instructions: "<p>11 - which we had set aside - must be oddly weighted</p><p>Villager 11 is heavier or lighter depending on which way it tilted the seesaw in the 1<sup>st</sup> move</p>",
        img: "",
        pageNo: 4,
        last: true
      },

      N: {
        title: "3<sup>rd</sup> Move Didn't balance",
        instructions: "<p>If the seesaw tilted in the opposite direction this time, it must be the villager we moved to the left side (9)</p><p>Otherwise, it must be the villager that remained on the right (10)</p>",
        img: "",
        pageNo: 4,
        last: true
      }
    }
  },
  // Not balancing first page
  N: {
    title: "1<sup>st</sup> Move Didn't balance",
    instructions: "<p>The oddly weighted villager must be on the seesaw (1-8).</p><p>Set 7 and 8 aside.<br>Weigh 1, 2, 5 against 3, 4, 6.</p>",
    img: "n.png",
    pageNo: 2,
    last: false,

    B: {
      title: "2<sup>nd</sup> Move Balanced",
      instructions: "<p>The oddly weighted villager must be one of the two we set aside (7-8)</p><p>Weigh any balancing villager (1-6, 9-12) against 7</p>",
      img: "nb.png",
      pageNo: 3,
      last: false,
      
      B: {
        title: "3<sup>rd</sup> Move Balanced",
        instructions: "<p>Villager 8 must be oddly weighted.</p><p>8 will be heavier or lighter depending on whether the right side was heavier or lighter in the 1<sup>st</sup> weighing",
        img: "",
        pageNo: 4,
        last: true
      },

      N: {
        title: "3<sup>rd</sup> Move Didn't Balance",
        instructions: "<p>Villager 7 must be oddly weighted</p><p>7 will heavier or lighter depending on the results of this weighing</p>",
        img: "",
        pageNo: 4,
        last: true
      }
    },
    
    N: {
      title: "2<sup>nd</sup> Move Didn't Balance",
      instructions: "<p>If the heavier side stayed the same, it must be 1, 2, or 6 - which did not move between weighings</p><p>Set villager 6 aside<br>Weigh 1 against 2.</p>",
      img: "nn.png",
      pageNo: 3,
      last: false,
      
      B: {
        title: "3<sup>rd</sup> Move Balance",
        instructions: "<p>Villager 6 must be oddly weighted</p><p>6 will be heavier or lighter depending on which way the seesaw leaned in the last weighing</p>",
        img: "",
        pageNo: 4,
        last: true
      },
      N: {
        title: "3<sup>rd</sup> Move Didn't Balance",
        instructions: "<p>If the left side was heavier in the 1<sup>st</sup> move, then we know that the target villager is heavier</p><p>Therefore, 1 or 2 would be the target depending on which weighs the seesaw down</p>",
        img: "",
        pageNo: 4,
        last: true
      }
    }
  }
};


// Render solution pages
let pagesHolder = document.getElementById("pagesHolder");
let page2 = document.getElementById("page2");
let page3 = document.getElementById("page3");
let page4 = document.getElementById("page4");

// Page 1
let page1_balance = document.getElementById("page1_balance");
let page1_noBalance = document.getElementById("page1_noBalance");

// Scroll to next page from first page
page1_balance.addEventListener("click", () => {
  page2.innerHTML = generateSolution(branches.B);
  solutionScroll(1);
});

page1_noBalance.addEventListener("click", () => {
  page2.innerHTML = generateSolution(branches.N);
  solutionScroll(1);
});

// Function to move to next solution page
function solutionScroll (pageNo) {

  if (pageNo === 1) {
    pagesHolder.style.transform = "translateY(-25%)";
  } else if (pageNo === 2) {
    pagesHolder.style.transform = "translateY(-50%)";
  } else if (pageNo === 3) {
    pagesHolder.style.transform = "translateY(-75%)";
  } else {
    pagesHolder.style.transform = "translateY(0%)";

    // Clear the solution pages
    setTimeout(() => {
      page2.innerHTML = "";
      page3.innerHTML = "";
      page4.innerHTML = "";
    }, 500);
  }
}

// Function to generate page
function generateSolution (branch) {

  let innerHTML = "";
  let nextPage = "";

  innerHTML = `
    <div class="solution-title">
      <h4>${branch.title}</h4>
    </div>
    
    <div class="back-btn" id="back${branch.pageNo}">
      <svg viewbox="0 0 100 100">
        <g>
          <line x1="10" y1="50" x2="90" y2="50" class="arrow-line";/>
          <line x1="90" y1="50" x2="60" y2="30" class="arrow-line";/>
          <line x1="90" y1="50" x2="60" y2="70" class="arrow-line";/>
        </g>
      </svg>
    </div>
    <div class="steps">
      ${branch.instructions}
    </div>
  <img src="images/results/${branch.img}">`

  if (branch.last == false) {
    nextPage = `
      <div class="next-page">
        <p>Next, If the seesaw...</p>
        <button id="page${branch.pageNo}_balance">Balances</button>
        <button id="page${branch.pageNo}_noBalance">Doesn't balance</button>
      </div>`

  } else {
    nextPage = `
    <div class="next-page">
      <button id="solutionHome">Return to start</button>
    </div>    
    `
  }


  setTimeout(() => {solutionListeners(branch);}, 500);



  let returnedHTML = innerHTML + nextPage;
  return returnedHTML;

}

// Add event listeners to new buttons
function solutionListeners (branch) {

  let nextPage = document.getElementById(`page${(branch.pageNo + 1)}`);
  let backBtn = document.getElementById(`back${branch.pageNo}`);

  backBtn.addEventListener("click", () => {
    solutionScroll((branch.pageNo - 2));
  });

  // If not the last page in the branch
  if (branch.last == false) {

    // Go to next B in the branch
    document.getElementById(`page${branch.pageNo}_balance`).addEventListener("click", () => {
      nextPage.innerHTML = generateSolution(branch.B);
      solutionScroll(branch.pageNo);
    });

    // Go to next N in the branch
    document.getElementById(`page${branch.pageNo}_noBalance`).addEventListener("click", () => {
      nextPage.innerHTML = generateSolution(branch.N);
      solutionScroll(branch.pageNo);
    });
  }

  // If no more pages afterwards
  else {
    document.getElementById("solutionHome").addEventListener("click", () => {solutionScroll("last")})
  } 
}












// Guess meeples
let guessMeeples = document.querySelectorAll(".guess-label");

// On radio select, make all of them filtered (add class for grayscale)
// First meeple is black so also needs to be inverted


// TODO TODO TODO TODO 
