import {
  User
} from './User.js'; //The iported class

console.log("Ex1:");
let arrayStrings = ["Love", "I", "Javascript"];

function changeArray() {
  arrayStrings.pop();
  arrayStrings.pop();
  arrayStrings.pop();
  arrayStrings.push("I");
  arrayStrings.push("Love");
  arrayStrings.push("Javascript");
  console.log(arrayStrings);
}
changeArray();

console.log("\n"); //For the visual efect in the console

console.log("Ex2:");
let arrayValues = ["Paul", 1, false, {
      name: "Jon Snow"
  },
  [1, 2, 3], null, undefined,
  function() {
      console.log('Test')
  }
];

for (let index = 0; index < arrayValues.length; index++) {

  console.log(index);
  console.log(arrayValues[index]);
  console.log(typeof arrayValues[index]);

}


console.log("\n");

//Ex3-4

const canvas = document.getElementById("canvasId");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');


const mario = new Image();
mario.src = 'assets/mario.png';
const MARIO_WIDTH = 32;
const MARIO_HEIGHT = 39;
let marioX = 0;
let marioY = 0;
mario.onload = () => {
  context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)
}




document.addEventListener("keydown", function(event) {
  context.clearRect(0, 0, 600, 400);

  var direciot = 0;

  switch (event.key) {
      case 'ArrowUp': {
          marioY -= 10;
          direciot = 4;
          break;
      }
      case 'ArrowDown': {
          marioY += 10;
          direciot = 0;
          break;
      }
      case 'ArrowLeft': {
          marioX -= 10;
          direciot = 2;
          break;
      }
      case 'ArrowRight': {
          marioX += 10;
          direciot = 2;
          break;
      }
  }



  // Conditions for the player to stay on the canvas

  if (canvas.width - 23 > marioX) {
      if (0 > marioX) {
          marioX = 0;
      }
  } else {
      marioX = canvas.width - 23;
  }

  if (canvas.height - 32 > marioY) {

      if (0 < marioY) {

      } else {

          marioY = 0;

      }
  } else {

      marioY = canvas.height - 32;

  }
  context.drawImage(mario, 0 * MARIO_WIDTH, direciot * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT);
});

console.log("Ex6:");

//Here I use the imported class, create 3 users and  called all methods.

let user1 = new User("Mario", "21", "Student", "university", "0732165402");
user1.userData();
user1.userName();
user1.JSON();

console.log("\n");
let user2 = new User("Darius", "23", "Student", "university", "0732169782");
user2.userData();
user2.userName();
user2.JSON();

console.log("\n");
let user3 = new User("Oana", "19", "Student", "university", "0732745402");
user3.userData();
user3.userName();
user3.JSON();