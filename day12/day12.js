const fs = require("fs");

class Directions {
  dirs = {
    0: "E",
    1: "S",
    2: "W",
    3: "N",
  };

  constructor(list) {
    this.instructionList = list;
    this.north = 0;
    this.east = 0;
    this.facing = 0; // E
  }

  move = (dir, count) => {
    // N, S, E, W = move in that direction
    // L, R = turn that many degrees
    // F = move in facing direction
    console.log(`moving ${count} ${dir}`);
    switch (dir) {
      case "N":
        this.north += count;
        break;
      case "S":
        this.north -= count;
        break;
      case "E":
        this.east += count;
        break;
      case "W":
        this.east -= count;
        break;
      case "F":
        this.move(this.dirs[this.facing], count);
        break;
      case "L":
      case "R":
        this.rotate(dir, count);
        break;
      default:
        throw new Error(`invalid instruction ${dir}`);
    }
  };

  rotate = (dir, amount) => {
    // change this.facing
    const numTurns = amount / 90;
    console.log(`turning ${dir} ${numTurns}`);
    if (dir === "L") {
      this.facing = (this.facing - numTurns + 4) % 4;
    } else {
      this.facing = (this.facing + numTurns + 4) % 4;
    }
  };

  getManhattenDistance = () => {
    return Math.abs(this.north) + Math.abs(this.east);
  };

  processInstructions = () => {
    // loopy time!
    this.instructionList.forEach((item) => {
      const regex = /([NSEWLRF])(\d+)/;
      const [, dir, amount] = item.match(regex);
      this.move(dir, parseInt(amount));
    });
  };
}

const instructions = fs.readFileSync("input.txt", "utf-8").split("\n");

const boaty = new Directions(instructions);

boaty.processInstructions();

console.log(boaty.getManhattenDistance());
