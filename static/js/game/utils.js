export function random(limit, lowest = 0) {
  return Math.floor(Math.random() * limit + lowest) + lowest;
}

var TO_RADIANS = Math.PI / 180;

export function drawRotatedImage(
  canvas,
  ctx,
  angle,
  image,
  imageX,
  imageY,
  imageWidth,
  imageHeight,
  dx,
  dy,
  dWidth,
  dHeight
) {
  // save the current co-ordinate system
  // before we screw with it
  ctx.save();

  // move to the middle of where we want to draw our image
  ctx.translate(dx, dy);

  // rotate around that point, converting our
  // angle from degrees to radians
  ctx.rotate(angle * TO_RADIANS);

  ctx.translate(-dx, -dy);

  // draw it up and to the left by half the width
  // and height of the image
  console.log(imageX, imageY, imageWidth, imageHeight, dx, dy, dWidth, dHeight);

  // example: drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage(
    image,
    imageX,
    imageY,
    imageWidth,
    imageHeight,
    -dx / 2,
    -dy / 2,
    dWidth,
    dHeight
  );
  // ctx.drawImage(image, -imageWidth / 2, -imageWidth / 2);
  // and restore the co-ords to how they were when we began
  ctx.restore();
}
