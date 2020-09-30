// DOM variables
let meeples = document.querySelectorAll(".meeple");
let seesaw = document.getElementById("seesaw");
let weighBtn = document.getElementById("weighBtn");
let remainingCount = document.getElementById("remainingCount");
let canvasContainer = document.getElementById("canvasContainer");
let firstCanvas = document.getElementById("firstCanvas");
let secondCanvas = document.getElementById("secondCanvas");

// JS Variables
const meepleLocations = [];
let remaining = 3;
let target = Math.floor(Math.random() * meeples.length);
let weight = Math.floor(Math.random() * 2) + 1;

// New game
document.getElementById("newGame").addEventListener("click", newGame);

// Reset meeples
document.getElementById("resetMeeples").addEventListener("click", meepleStart);

// Weight on left and right
weighBtn.addEventListener("click", checkWeight);



////////////////////////////////////// Functions ////////////////////////////////////////////

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

}




// Check weight
function checkWeight() {

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
    }
  }

  seesaw.className = "wobble-group";
  let outcome;

  setTimeout(function() {
    // Balance
    if (leftWeight === rightWeight) {
      seesaw.classList.add("wobble");
      outcome = "even";
    }

    // Left heavier
    else if (leftWeight > rightWeight) {
      seesaw.classList.add("heavier");
      outcome = "heavier";
    }
    // Right heavier
    else {
      seesaw.classList.add("lighter");
      outcome = "lighter";
    }

    saveHistory(outcome);

  }, 159);
  
}


// Screenshot last move
function saveHistory(outcome) {


  if (remaining === 3) {

    // Heavier

    setTimeout(function() {
      html2canvas(document.querySelector("#capture"), {
  
      }).then(canvas => {
        firstCanvas.appendChild(canvas)
        firstCanvas.childNodes[0].classList.add(`canvas-${outcome}`);
    });
  
    }, 2000);
  }

  else if (remaining === 2) {

    setTimeout(function() {
      html2canvas(document.querySelector("#capture"), {
  
      }).then(canvas => {
        secondCanvas.appendChild(canvas);
        secondCanvas.childNodes[0].classList.add(`canvas-${outcome}`);
    });
  
    }, 2000);
  }

  remaining--;
 
}














// Keep this - this is for actually dragging
function dragMoveListener (event) {
  var target = event.target

  target.classList.remove("dropped-left");
  target.classList.remove("dropped-right");
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