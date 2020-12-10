const fs = require("fs");

/**
 * adapter can take input 1, 2, or 3 lower
 * and 3 higher
 *
 */

class Adapters {
  constructor(source, adapters) {
    this.source = 0;
    this.adapters = adapters;
    this.diff1 = 0;
    this.diff2 = 0;
    this.diff3 = 0;

    // find our highest rated adapter, add 3, and add to list
    const highest = Math.max(...this.adapters);
    this.adapters.push(highest + 3);
  }

  haveAdapter = () => {
    // is there something in our list rated for connecting to source (+1, +2, +3):

    // sorry, this code is disgusting.
    if (this.adapters.indexOf(this.source + 1) != -1) {
      this.diff1++;
      this.adapters.splice(this.adapters.indexOf(this.source + 1), 1);
      this.source++;
      return true;
    }
    if (this.adapters.indexOf(this.source + 2) != -1) {
      this.diff2++;
      this.adapters.splice(this.adapters.indexOf(this.source + 2), 1);
      this.source += 2;
      return true;
    }
    if (this.adapters.indexOf(this.source + 3) != -1) {
      this.diff3++;
      this.adapters.splice(this.adapters.indexOf(this.source + 3), 1);
      this.source += 3;
      return true;
    }

    return false;
  };

  run = () => {
    while (this.adapters.length > 0) {
      this.haveAdapter();
    }

    //console.log(this.diff1);
    //console.log(this.diff3);

    console.log(`product: ${this.diff1 * this.diff3}`);
  };
}

const joltages = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((x) => parseInt(x));

const bagOfCables = new Adapters(0, joltages);

bagOfCables.run();
