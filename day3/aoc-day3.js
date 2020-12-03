const fs = require("fs");
// count the trees (#) we crash into

const countTrees = (woods, dx, dy) => {
  const woodLength = woods.length;
  let x = 0;
  let y = 0;
  let treeCount = 0;

  while (y < woodLength) {
    x = x % woods[y].length;
    const current = woods[y].charAt(x);
    console.log(`x: ${x}, y: ${y} = ${current}`);
    if (current == "#") treeCount++;
    x += dx;
    y += dy;
  }

  return treeCount;
};

const woods = fs.readFileSync("./aoc-3-input.txt", "utf-8").split("\n");

// part 1

const a = countTrees(woods, 3, 1);
console.log(a);

// part 2 (other paths)
const b = countTrees(woods, 1, 1);
const c = countTrees(woods, 5, 1);
const d = countTrees(woods, 7, 1);
const e = countTrees(woods, 1, 2);

console.log(a * b * c * d * e);
