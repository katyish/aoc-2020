const fs = require("fs");

// count how many passports in a list contain all the reqKeys
const countValidPassports = (passports, reqKeys) => {
  let passportCount = 0;

  passports.forEach((passport) => {
    let fields = passport.split(/\s/);
    let obj = {};
    fields.forEach((data) => {
      let [, key, value] = data.match(/([a-z]{3}):([#\w]*)/);
      obj[key] = value;
    });

    // check the keys are valid
    if (
      reqKeys.every((i) => {
        return Object.keys(obj).indexOf(i) !== -1;
      })
    ) {
      passportCount++;
    }
  });
  return passportCount;
};

const passports = fs.readFileSync("aoc-4-input.txt", "utf-8").split("\n\n");

const validFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

console.log(countValidPassports(passports, validFields));
