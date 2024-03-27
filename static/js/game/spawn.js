import { Rect, rects } from "./Rect.js";

let spawnCounter = 0;
function setRectTimer() {
  spawnCounter++;
  rects.push(new Rect());
  if (spawnCounter > 100) {
    return;
  }
  const numOfFives = Math.ceil(rects.length / 5);
  return setTimeout(() => {
    setRectTimer();
  }, numOfFives * 1);
}

setRectTimer();
