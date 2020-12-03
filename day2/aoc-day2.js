const fs = require("fs");

const howManyValidPasswords = (passwordList) => {
  let count = 0;
  passwordList.forEach((data) => {
    let match = data.match(/^([0-9]+)-([0-9]+)\s([A-z]):\s(.*)$/);

    const password = match[4];
    const letter = match[3];
    const min = match[1];
    const max = match[2];

    const letterCount = (password.match(new RegExp(letter, "g")) || []).length;
    // console.log(`min: ${min}, max: ${max}, matches: ${letterCount}`);

    if (letterCount >= min && letterCount <= max) {
      count++;
    }
  });
  return count;
};

const passwords = fs.readFileSync("./aoc-2-input.txt", "utf-8").split("\n");

console.log(howManyValidPasswords(passwords));
