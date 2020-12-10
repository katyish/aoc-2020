const fs = require("fs");

const checkList = (list, offset) => {
  for (let i = offset; i < list.length; i++) {
    // preamble = previous offset number of items
    let preamble = list.slice(i - offset, i);
    if (!isSummable(list[i], preamble)) {
      return list[i];
    }
  }
};

// is target the sum of two numbers in list
const isSummable = (target, list) => {
  const subList = list.slice();

  for (let i of list) {
    if (i >= target) {
      continue;
    }
    let goal = target - i;
    if (list.includes(goal)) {
      return true;
    }
  }
  return false;
};

const list = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((x) => parseInt(x));

console.log(checkList(list, 25));
