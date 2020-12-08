const { fips } = require("crypto");
const fs = require("fs");

class Accumulator {
  constructor(instructions) {
    this.instructionList = instructions;
    this.line = 0;
    this.accumulator = 0;
    this.processed = []; // note lines we've done here
  }

  followInstruction = (line) => {
    let [operation, value] = this.instructionList[line].split(/\s/);
    value = parseInt(value);
    switch (operation) {
      case "nop":
        this.line++;
        break;
      case "acc":
        this.line++;
        this.accumulator += value;
        break;
      case "jmp":
        this.line += value;
        break;
      default:
        console.log("invalid operation");
        break;
    }
    this.processed.push(line);
  };

  run = () => {
    // while true.  I know...
    while (1) {
      // are we complete?
      if (this.line == this.instructionList.length) {
        return "program completed";
      }
      // have we processed this line? ie is there an infinite loop
      if (this.processed.includes(this.line)) {
        return `loop detected: ${this.accumulator}`;
      }
      this.followInstruction(this.line);
    }
  };
}

const instructions = fs.readFileSync("input.txt", "utf-8").split("\n");

const acc = new Accumulator(instructions);
console.log(acc.run());
