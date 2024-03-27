import { Rect } from "./Rect.js";
import { Limiter } from "./limits.js";
import { canvas, ctx } from "./canvas.js";
import { pressedKeys } from "./key.js";

// TODO no spawning rect overlapping, or invincible for moment to get out of overlap, prevents unfair damage

const dires = ["up", "right", "down", "left"];

export class Player extends Rect {
  constructor(color) {
    super(color);
    this.killCountSizePlus = 5;
    this.killCount = 0;
    this.turnLimiter = new Limiter(50);
    this.isPlayer = true;
    this.shotLimiter = new Limiter(20);
    this.defaultHp = 100;
    this.maxHp = 100;
    this.hp = this.defaultHp;
    this.speed = 0.6;
    this.defaultHeight = 10;
    this.height = this.defaultHeight;
    this.defaultWidth = 10;
    this.width = this.defaultWidth;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 - this.height / 2;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.beginPath();
    ctx.lineWidth = 2;
    if (this.shootDire === "up") {
      ctx.moveTo(this.x + this.width / 4, this.y);
      ctx.lineTo(this.x + this.width - this.width / 4, this.y);
    } else if (this.shootDire === "right") {
      ctx.moveTo(this.x + this.width, this.y + this.height / 4);
      ctx.lineTo(this.x + this.width, this.y + this.height - this.height / 4);
    } else if (this.shootDire === "down") {
      ctx.moveTo(this.x + this.width / 4, this.y + this.height);
      ctx.lineTo(this.x + this.width - this.width / 4, this.y + this.height);
    } else if (this.shootDire === "left") {
      ctx.moveTo(this.x, this.y + this.height / 4);
      ctx.lineTo(this.x, this.y + this.height - this.height / 4);
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
  rotate() {
    if (!this.turnLimiter.ready()) {
      return;
    }

    let didRotate = false;
    if (pressedKeys.a) {
      didRotate = true;
      const index = dires.indexOf(this.shootDire);
      if (index === 0) {
        this.shootDire = dires[dires.length - 1];
      } else {
        this.shootDire = dires[index - 1];
      }
    }
    if (pressedKeys.f) {
      didRotate = true;
      const index = dires.indexOf(this.shootDire);
      if (index === dires.length - 1) {
        this.shootDire = dires[0];
      } else {
        this.shootDire = dires[index + 1];
      }
    }
    if (didRotate) {
      this.turnLimiter.restart();
    }
  }
  updatePlayer() {
    if (pressedKeys.up) {
      this.yDire = "up";
    }
    if (pressedKeys.down) {
      this.yDire = "down";
    }
    if (pressedKeys.right) {
      this.xDire = "right";
    }
    if (pressedKeys.left) {
      this.xDire = "left";
    }
    if (pressedKeys.spaceBar) {
      this.shoot();
    }
    this.width = Math.min(
      canvas.width,
      this.defaultWidth + this.killCount * this.killCountSizePlus
    );
    this.height = Math.min(
      canvas.height,
      this.defaultHeight + this.killCount * this.killCountSizePlus
    );
    this.rotate();

    this.turnLimiter.update();
    this.shotLimiter.update();

    if (pressedKeys[32]) {
      this.shoot();
    }
  }
}
