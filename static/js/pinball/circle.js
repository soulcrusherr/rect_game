const canvas = document.getElementById("canvasss");
const ctx = canvas.getContext("2d");
const button = document.getElementById("button");
// const bong = new Audio("sound/bong_taco.mp3");
let vh = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);
var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
canvas.width = vw;
canvas.height = vh;
let ballX = Math.floor(Math.random() * 150);
let ballY = Math.floor(Math.random() * 100);
ctx.fillStyle = "black";
// const maxVelocity = 100;
let xdire = Math.random() < 0.5 ? "right" : "left";
let mute = true;
// let bong2 = new Audio("sound/bong_taco2.mp3");
let bongCount = 0;
let ydire = Math.random() < 0.5 ? "up" : "down";
let rad = 10;
let speed = 100;
const random = function () {
  return Math.floor(Math.random() * 255);
};
button.addEventListener("click", () => {
  mute = !mute;
  button.textContent = mute ? "unmute" : "mute";
});
function bongTime() {
  const gun = document.getElementById("gun");
  const bong = document.getElementById("bong");
  const pong = document.getElementById("pong");
  const ping = document.getElementById("ping");

  if (!mute) {
    if (bongCount % 2 === 0) {
      gun.load();
      gun.play();
      bong.load();
      bong.play();
      pong.load();
      pong.play();
    } else {
      gun.load();
      gun.play();
      bong.load();
      bong.play();
      ping.load();
      ping.play();
    }
    bongCount++;
  }
}
class Ball {
  constructor(r, x, y, color) {
    this.rad = r;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  update(secondsPassed) {
    if (xdire === "right") {
      ballX += speed * secondsPassed;
    }
    if (xdire === "left") {
      ballX -= speed * secondsPassed;
    }

    if (ballX + rad >= canvas.width / 2) {
      // console.log(maxVelocity);
      // speed = Math.min(maxVelocity, speed + 1);

      bongTime();
      xdire = "left";
    } else if (ballX - rad <= 0) {
      bongTime();
      xdire = "right";
    }
    if (ydire === "down") {
      ballY += speed * secondsPassed;
    }
    if (ydire === "up") {
      ballY -= speed * secondsPassed;
    }
    if (ballY + rad >= canvas.height) {
      bongTime();
      ydire = "up";
    } else if (ballY - rad <= 0) {
      bongTime();
      ydire = "down";
    }
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h);
    ctx.fillRect(290, 10, 5, 30);
    ctx.fillStyle = `rgb(${random()}, ${random()} , ${random()})`;
    ctx.beginPath();
    ctx.arc(ballX, ballY, rad, 0, 2 * Math.PI);
    ctx.fill();
  }
}
const ball = new Ball(rad, ballX, ballY, "red");
class Paddle {
  constructor(x, y, h, w) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
  }
  update() {
    if (xdire === "left") {
      if (
        // left of ball < right of paddle
        ballX - rad <= leftPaddle.x + leftPaddle.w &&
        // ball center y lower than top of paddle
        ballY > leftPaddle.y &&
        // ball center y higher than bottom of paddle
        ballY < leftPaddle.y + leftPaddle.h
      ) {
        console.log(
          "ballX:",
          ballX,
          "ballY:",
          ballY,
          "rad:",
          rad,
          ", paddle x:",
          leftPaddle.x,
          ", paddle w:",
          leftPaddle.w,
          ", paddle y:",
          leftPaddle.y
        );
        bongTime();
        xdire = "right";
      }
    }
  }
}
const leftPaddle = new Paddle(160, 0, 100, 5);

let secondsPassed = 0;
let oldTimeStamp = 0;

window.requestAnimationFrame(gameLoop);

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  update(secondsPassed);
  ball.update(secondsPassed);
  ball.draw();
  ctx.strokeStyle = "orange";
  ctx.beginPath();
  ctx.moveTo(220, 0);
  ctx.lineTo(220, 500);
  ctx.stroke();
  window.requestAnimationFrame(gameLoop);
}

// collision logic
// c = sqrt((x1 - x2)^2 + (y1 - y2)^2)
function update() {}

/*
  if ball direction is left
  and ball ballX - ball radius === paddle ballX + paddle.width
  and ball center is lower than top of paddle and ball center is higher than paddle bottom

  */

document.addEventListener("keydown", () => {
  console.log(event.keyCode);
  // 87 means up/w
  if (event.keyCode === 87) {
    leftPaddle.y = Math.max(30, leftPaddle.y - 10);
    leftPaddle.y -= 30;
  }
  // 83 means down/s
  if (event.keyCode === 83) {
    leftPaddle.y = Math.min(600, leftPaddle.y + leftPaddle.h - 10);
    leftPaddle.y += 30;
  }
});
