// todo: spacebar mash battle, make gun

import { canvas, ctx } from "./canvas.js";
import { Player } from "./Player.js";
import { Rect } from "./Rect.js";
import { keyPressCompleted } from "./key.js";

let isPaused;

const rects = [];

let rectNum = 100;

const player = new Player("black");

rects.push(player);

// rects.push(new Rect("orange"));

for (let i = 0; i < rectNum; i++) {
  rects.push(new Rect());
}
function draw(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (keyPressCompleted.enter) {
    isPaused = !isPaused;
    keyPressCompleted.enter = !keyPressCompleted.enter;
  }
  if (isPaused) {
    rects.forEach((rect) => {
      rect.draw();
    });
    player.draw();
    for (let i = 0; i < player.bullets.length; i++) {
      player.bullets[i].draw();
    }
    return;
  }
  const ded = [];
  player.updatePlayer();
  rects.forEach((rect, i) => {
    rect.update(rects);
    if (rect.hp <= 0) {
      ded.push(i);
    } else {
      rect.draw();
    }
  });
  for (let i = ded.length - 1; i > -1; i--) {
    rects.splice(ded[i], 1);
  }
  player.draw();
}
window.requestAnimationFrame(gameLoop);
let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
  // Calculate the number of seconds passed since the last frame
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Calculate fps
  fps = Math.round(1 / secondsPassed);

  // Draw number to the screen
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 200, 100);
  ctx.font = "25px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("FPS: " + fps, 10, 30);

  // Perform the drawing operation
  draw(ctx);

  // The loop function has reached it's end. Keep requesting new frames
  window.requestAnimationFrame(gameLoop);
}
// window.requestAnimationFrame(gameLoop);
// let secondsPassed;
// let oldTimeStamp;
// let fps;
// function gameLoop(timestamp) {
//   secondsPassed = (timestamp - oldTimeStamp) / 1000;
//   oldTimeStamp = timestamp;
//   fps = Math.round(1 / secondsPassed);
//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, 200, 100);
//   ctx.font = "25px Arial";
//   ctx.fillStyle = "black";
//   ctx.fillText("FPS: " + fps, 10, 30);
//   draw(ctx);

//   window.requestAnimationFrame(gameLoop);
// }
