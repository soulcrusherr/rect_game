// const dirMap = {
//   left: "right",
//   right: "left",
//   up: "down",
//   down: "up",
// };

import { random } from "./utils.js";

// function reverseDirection(dir) {
//   return dirMap[dir];
// }

export function isCollided(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y + rect1.height > rect2.y &&
    rect1.y < rect2.y + rect2.height
  ) {
    return true;
  }
  return false;
}

export function collide(rect1, rect2) {
  const bottomThis = rect1.y + rect1.height;
  const topThis = rect1.y;
  const leftThis = rect1.x;
  const rightThis = rect1.x + rect1.width;
  const leftRect = rect2.x;
  const rightRect = rect2.x + rect2.width;
  const bottomRect = rect2.y + rect2.height;
  const topRect = rect2.y;

  // how close is each side to the other
  const sides = [
    { side: "top", val: -(topThis - bottomRect) }, // more negative, switch to positive for comparing
    { side: "bottom", val: bottomThis - topRect }, // more positive
    { side: "left", val: -(leftThis - rightRect) }, // more negative, switch to positive for comparing
    { side: "right", val: rightThis - leftRect }, // more positive
  ];

  const biggestCollision = Math.min(...sides.map((s) => s.val));
  const biggestCollisionSideObj = sides.find((s) => s.val === biggestCollision);
  const biggestCollisionSide = biggestCollisionSideObj.side;

  // if only one side collided reverse move direction based on single side
  if (biggestCollisionSide === "top") {
    rect1.yDire = "down";
    rect2.yDire = "up";
  }
  if (biggestCollisionSide === "bottom") {
    rect1.yDire = "up";
    rect2.yDire = "down";
  }
  if (biggestCollisionSide === "left") {
    rect1.xDire = "right";
    rect2.xDire = "left";
  }
  if (biggestCollisionSide === "right") {
    rect1.xDire = "left";
    rect2.xDire = "right";
  }
  if (rect1.color === rect2.color) {
    if (rect1.hp < rect1.maxHp) {
      rect1.hp++;
    }
    if (rect2.hp < rect2.maxHp) {
      rect2.hp++;
    }
  } else {
    if (rect1.isPlayer) {
      let chooseYourFate = random(10, 0);
      console.log(chooseYourFate);
      if (chooseYourFate > 2) {
        if (!rect2.isPlayer) {
          rect2.hp--;
          if (rect2.hp <= 1) {
            rect1.killCount++;
          }
        }
      }
    }
  }
  return;
}
