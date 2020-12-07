const fs = require("fs");

const countBagRules = (rulesList, colour, counted = []) => {
  // [colour] bags contain [rules about other colours]
  const regex = new RegExp(`(\\w*\\s\\w*) bags contain .* (${colour}) .*`);

  let count = 0;

  rulesList.forEach((item) => {
    if (item.match(regex)) {
      const newColour = item.match(regex)[1];

      // continue if we haven't already counted this colour
      if (!counted.includes(newColour)) {
        console.log(`counting rules for ${newColour}...`);
        counted.push(newColour);
        count++;
        count += countBagRules(rulesList, newColour, counted);
      }
    }
  });

  return count;
};

const countInnerBags = (rulesList, colour) => {
  // count number of bags inside our bag (and so on down the rabbit holes)

  const regex = new RegExp(`^(${colour}) .*`);

  // match number and colour of inner bags
  const countRegex = new RegExp(/([\d]+) (\w*\s\w*) bag(s)?/, "g");

  let count = 1; // we start with the one bag we're looking at!
  rulesList.forEach((item) => {
    // find line starting with our colour
    if (item.match(regex)) {
      console.log(`found ${colour} rule`);

      // find out what bags it contains
      const matches = [...item.matchAll(countRegex)];

      if (matches.length > 0) {
        matches.forEach((m) => {
          const num = parseInt(m[1]);
          const col = m[2];
          console.log(num, col);
          count += num * countInnerBags(rulesList, col);
        });
      }
    }
  });
  return count;
};

const bagRules = fs.readFileSync("input.txt", "utf-8").split("\n");
// part 1
// console.log(countBagRules(bagRules, "shiny gold"));

// part 2
const howManyBags = countInnerBags(bagRules, "shiny gold");
// subtract 1 as this total INCLUDES our outer bag, and we only want to know what's inside
console.log(howManyBags - 1);
