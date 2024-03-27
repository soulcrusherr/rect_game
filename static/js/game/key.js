export const pressedKeys = {};
export const keyPressCompleted = {};

//https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
const keyMap = {
  32: "spaceBar",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  65: "a",
  70: "f",
};

const keyUpMap = {
  13: "enter",
};

const validKeys = Object.keys(keyMap).map(Number);
const validKeyUpKeys = Object.keys(keyUpMap).map(Number);

document.addEventListener("keydown", function (event) {
  if (validKeys.includes(event.keyCode)) {
    pressedKeys[keyMap[event.keyCode]] = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (validKeys.includes(event.keyCode)) {
    pressedKeys[keyMap[event.keyCode]] = false;
  }
  if (validKeyUpKeys.includes(event.keyCode)) {
    keyPressCompleted[keyUpMap[event.keyCode]] = true;
  }
});
