const fs = require("fs");

const findSeat = (boardingPass) => {
  let [, rows, cols] = boardingPass.match(/([F|B]+)([L|R]+)/);

  const row = traverse(0, 127, "B", "F", rows);
  const col = traverse(0, 7, "R", "L", cols);

  return row * 8 + col;
};

const traverse = (min, max, upper, lower, data) => {
  for (char in data) {
    let direction = data[char];
    let halfSize = (max + 1 - min) / 2;

    if (direction == upper) {
      // keep upper half
      min += halfSize;
    }
    if (direction == lower) {
      // keep lower half
      max -= halfSize;
    }
    if (max == min) {
      return max;
    }
  }
};

const passes = fs.readFileSync("input.txt", "utf-8").split("\n");

let seatIDs = [];
for (key in passes) {
  seatIDs.push(findSeat(passes[key]));
}

// highest seatID in the list:
console.log(Math.max(...seatIDs));
