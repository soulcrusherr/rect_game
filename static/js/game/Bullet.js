import { canvas, ctx } from "./canvas.js";
import { drawRotatedImage } from "./utils.js";

export class Bullet {
  constructor(x, y, dire, color, width, height) {
    this.x = x;
    this.y = y;
    this.speed = 1.5;
    this.width = width || 1;
    this.height = height || 1;
    this.dire = dire;
    this.color = color;
  }
  update() {
    if (this.dire === "up") {
      this.y -= this.speed;
      this.angle = 0;
    }
    if (this.dire === "down") {
      this.y += this.speed;
      this.angle = 180;
    }
    if (this.dire === "right") {
      this.x += this.speed;
      this.angle = 90;
    }
    if (this.dire === "left") {
      this.x -= this.speed;
      this.angle = 270;
    }
    if (
      this.x + this.width < 0 ||
      this.x > canvas.width ||
      this.y + this.height < -this.height ||
      this.y > canvas.height + this.height
    ) {
      this.isDone = true;

      return;
    }

    // (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    const bulletImage = document.getElementById("bulletImage");
    // const scale = 2;

    // example: (ctx, angle, image, x, y, width, height, dx, dy, dWidth, dHeight)
    drawRotatedImage(
      canvas,
      ctx,
      this.angle,
      bulletImage,
      0,
      0,
      bulletImage.width,
      bulletImage.height,
      this.x,
      this.y,
      50,
      50
    );

    // example: drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // ctx.drawImage(
    //   bulletImage,
    //   0,
    //   0,
    //   bulletImage.width,
    //   bulletImage.height,
    //   this.x,
    //   this.y,
    //   50,
    //   50
    // );

    console.log(
      "**** canvas.width:",
      canvas.width,
      ", canvas.height:",
      canvas.height
    );
    ctx.rect(0, 0, 50, 50);
    ctx.stroke();
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
