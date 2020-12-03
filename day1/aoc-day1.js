const fs = require("fs");

const numbers = fs.readFileSync("./aoc-1-input.txt", "utf-8").split("\n");

/** find numbers that add to target, and return the product */
const findTarget = (target, numbers) => {
  for (let i of numbers) {
    if (i >= target) {
      continue;
    }
    let goal = target - i;
    console.log(`target: ${target}, goal: ${goal}, i: ${i}`);

    if (numbers.includes(goal.toString())) {
      return goal * i;
    } else {
      let match;
      if ((match = findTarget(goal, numbers))) {
        return match * i;
      }
    }
  }
};

console.log(findTarget(2020, numbers));
