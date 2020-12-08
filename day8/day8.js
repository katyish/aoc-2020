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
        console.log(`invalid operation ${operation}`);
        break;
    }
    this.processed.push(line);
  };

  run = () => {
    while (this.line < this.instructionList.length) {
      // have we processed this line? ie is there an infinite loop
      if (this.processed.includes(this.line)) {
        return `loop detected: ${this.accumulator}`;
      }
      this.followInstruction(this.line);
    }
    return `program complete: ${this.accumulator}`;
  };
}

const instructions = fs.readFileSync("input-short.txt", "utf-8").split("\n");

const acc = new Accumulator(instructions);
console.log(acc.run());
