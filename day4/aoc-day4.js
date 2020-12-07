const fs = require("fs");

const numBetween = (value, min, max) => {
  return value >= min && value <= max;
};

const validHgt = (hgt) => {
  const regex = /([0-9]{2,3})(cm|in)/;

  console.log(regex.exec(hgt));
  try {
    let [, val, type] = hgt.match(/([0-9]{2,3})(cm|in)/);

    if (type === "cm") {
      return numBetween(val, 150, 193);
    } else if (type === "in") {
      return numBetween(val, 59, 76);
    }
  } catch {
    return false;
  }
};

const validHcl = (hcl) => {
  const regex = /#[abcdef0-9]{6}/;

  return regex.test(hcl);
};

const validEcl = (ecl) => {
  const values = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

  return values.includes(ecl);
};

const validPid = (pid) => {
  const regex = /[0-9]{9}/;

  return regex.test(pid);
};

const validPassport = (passport) => {
  let fields = passport.split(/\s/);
  let passportObj = {};
  fields.forEach((data) => {
    const [key, value] = data.split(":");
    passportObj[key] = value;
  });

  // check our data!
  if (!numBetween(passportObj.byr, 1920, 2002)) {
    console.log(`invalid byr ${passportObj.byr}`);
    return false;
  }
  if (!numBetween(passportObj.iyr, 2010, 2020)) {
    console.log(`invalid iyr ${passportObj.iyr}`);
    return false;
  }
  if (!numBetween(passportObj.eyr, 2020, 2030)) {
    console.log(`invalid eyr ${passportObj.eyr}`);
    return false;
  }
  if (!validHgt(passportObj.hgt)) {
    console.log(`invalid hgt ${passportObj.hgt}`);
    return false;
  }
  if (!validHcl(passportObj.hcl)) {
    console.log(`invalid hcl ${passportObj.hcl}`);
    return false;
  }
  if (!validEcl(passportObj.ecl)) {
    console.log(`invalid ecl ${passportObj.ecl}`);
    return false;
  }
  if (!validPid(passportObj.pid)) {
    console.log(`invalid pid ${passportObj.pid}`);
    return false;
  }

  console.log(`valid:`, passportObj);

  return true;
};

// count how many passports in a list contain all the reqKeys
const countValidPassports = (passports, reqKeys) => {
  let passportCount = 0;

  passports.forEach((passport) => {
    if (validPassport(passport)) {
      passportCount++;
    }
  });
  return passportCount;
};

const passports = fs.readFileSync("aoc-4-input.txt", "utf-8").split("\n\n");

const validFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

console.log(countValidPassports(passports, validFields));
