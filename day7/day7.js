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

const bagRules = fs.readFileSync("input.txt", "utf-8").split("\n");
console.log(countBagRules(bagRules, "shiny gold"));
