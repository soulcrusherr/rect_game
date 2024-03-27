import { random } from "./utils.js";
import { canvas, ctx } from "./canvas.js";
import { Bullet } from "./Bullet.js";
import { collide, isCollided } from "./collision.js";

const colors = ["red", "blue", "green", "purple", "cyan"];

export const rects = [];

export class Rect {
  constructor(color) {
    this.maxHp = 3;
    this.shootDire = "left";
    this.bullets = [];
    this.color = color || colors[random(colors.length)];
    this.defaultHp = this.color === "orange" ? 5 : 3;
    this.hp = this.defaultHp;
    this.speed = random(0.5, 0.1) / 2;
    this.height = 5;
    this.width = 5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.xDire = Math.random() < 0.5 ? "left" : "right";
    this.yDire = Math.random() < 0.5 ? "down" : "up";
  }
  handleCollision(rect) {
    collide(this, rect);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  switchColor(rect) {
    this.color = rect.color;
    this.hp = rect.defaultHp;
    this.defaultHp = rect.defaultHp;
  }
  shoot() {
    if (!this.shotLimiter.ready(true)) {
      console.log("not ready");
      return;
    }

    this.bullets.push(
      new Bullet(
        this.x,
        this.y,
        this.shootDire,
        this.color,
        this.width / 2,
        this.height / 2
      )
    );
  }

  update(rects) {
    if (this.bullets.length) {
      for (let i = this.bullets.length - 1; i > -1; i--) {
        this.bullets[i].update();
        if (this.bullets[i].isDone) {
          this.bullets.splice(i, 1);
          console.log("this.bullets:", this.bullets.length);
        } else {
          for (let rectIndex = 0; rectIndex < rects.length; rectIndex++) {
            if (rects[rectIndex] === this) {
              continue;
            }
            if (isCollided(rects[rectIndex], this.bullets[i])) {
              this.bullets[i].isDone = true;
              this.bullets.splice(i, 1);
              rects[rectIndex].speed /= 3;
              rects[rectIndex].hp -= 1;
              break;
            }
          }
        }
      }
    }

    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      if (rect === this) {
        continue;
      }
      if (isCollided(this, rect)) {
        this.handleCollision(rect);
      }
    }
    if (this.x + this.width >= canvas.width) {
      this.xDire = "left";
    }
    if (this.y + this.height >= canvas.height) {
      this.yDire = "up";
    }
    if (this.x <= 0) {
      this.xDire = "right";
    }
    if (this.y <= 0) {
      this.yDire = "down";
    }
    if (this.xDire === "right") {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
    if (this.yDire === "up") {
      this.y -= this.speed;
    } else {
      this.y += this.speed;
    }
  }
}
