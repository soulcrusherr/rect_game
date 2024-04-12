const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");
const eyeSprite = document.getElementById("eye-sprite");
let spriteMSPassed = 0;
let secondsPassed;
let oldTimeStamp;
// let fps;
let restTime = 0;
let counter = 0;
let forward = true;
const width = 1028;
canvas.width = 600;
canvas.height = 400;
// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "white";
  // ctx.beginPath();
  // ctx.arc(400, 200, 100, 0, 2 * Math.PI);
  // ctx.fill();
  // ctx.fillStyle = "black";
  // ctx.beginPath();
  // ctx.arc(400, 200, 10, 0, 2 * Math.PI);
  // ctx.fill();
  // ctx.fillStyle = "white";
  // ctx.beginPath();
  // ctx.arc(110, 200, 100, 0, 2 * Math.PI);
  // ctx.fill();

  // ctx.fillStyle = "black";
  // ctx.beginPath();
  // ctx.arc(100, 200, 10, 0, 2 * Math.PI);
  // ctx.fill();
  // ctx.fillStyle = "white";
  // ctx.beginPath();
  // ctx.moveTo(0, 0);
  // ctx.lineTo(200, 75);
  // ctx.lineTo(210, 85);
  // ctx.lineTo(0, 0);
  // ctx.fill();

  ctx.drawImage(
    eyeSprite,
    width * counter,
    0,
    width,
    width,
    100,
    200,
    100,
    100
  );
  // image, sx, sy, sw, sh, dx, dy, dw, dh
  ctx.drawImage(
    eyeSprite,
    width * counter,
    0,
    width,
    width,
    100,
    100,
    200,
    150
  );

  if (spriteMSPassed < 200) {
    return;
  }
  spriteMSPassed = 0;
  if (counter === 9) {
    restTime++;
    if (restTime < 5) {
      return;
    }
  }
  if (counter === 0) {
    if (restTime > 0) {
      restTime--;
      return;
    }
  }
  if (counter === 0) {
    forward = true;
  }
  if (counter === 9) {
    forward = false;
  }
  if (forward) {
    counter++;
  } else {
    counter -= 1;
  }
}

window.requestAnimationFrame(gameLoop);
// timeStamp is ms
function gameLoop(timeStamp) {
  const msPassed = timeStamp - oldTimeStamp;
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  spriteMSPassed += msPassed;
  // Calculate fps
  // fps = Math.round(1 / secondsPassed);
  draw(secondsPassed);
  window.requestAnimationFrame(gameLoop);
}
