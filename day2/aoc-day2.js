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

const howManyValidPasswordsPart2 = (passwordList) => {
  let count = 0;
  passwordList.forEach((data) => {
    let match = data.match(/^([0-9]+)-([0-9]+)\s([A-z]):\s(.*)$/);

    const password = match[4];
    const letter = match[3];
    const posA = match[1] - 1;
    const posB = match[2] - 1;

    console.log({ letter, posA, posB, password });

    // letter at posA XOR posB
    if (
      (password.charAt(posA) == letter && password.charAt(posB) != letter) ||
      (password.charAt(posA) != letter && password.charAt(posB) == letter)
    ) {
      count++;
    }
  });
  return count;
};

const passwords = fs.readFileSync("./aoc-2-input.txt", "utf-8").split("\n");

//console.log(howManyValidPasswords(passwords));

console.log(howManyValidPasswordsPart2(passwords));
