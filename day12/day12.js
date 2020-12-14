const fs = require("fs");

class Directions {
  dirs = {
    0: "E",
    1: "S",
    2: "W",
    3: "N",
  };

  constructor(list, dN, dE) {
    this.instructionList = list;
    this.north = 0;
    this.east = 0;
    this.dN = dN; // how far N is the waypoint
    this.dE = dE; // how far E is the waypoint
    this.facing = 0; // E
  }

  move = (dir, count) => {
    // N, S, E, W = move in that direction
    // L, R = turn that many degrees
    // F = move in facing direction
    switch (dir) {
      case "N":
        this.north += count * this.dN;
        break;
      case "S":
        this.north -= count * this.dN;
        break;
      case "E":
        this.east += count * this.dE;
        break;
      case "W":
        this.east -= count * this.dE;
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

  move2 = (dir, count) => {
    // N, S, E, W = move waypoint in that direction
    // L, R = turn *around* the waypoint
    // F = move this may times in direction of waypoint
    let angle;
    let dX, dY;
    switch (dir) {
      case "N":
        this.dN += count;
        break;
      case "S":
        this.dN -= count;
        break;
      case "E":
        this.dE += count;
        break;
      case "W":
        this.dE -= count;
        break;
      case "F":
        this.north += count * this.dN;
        this.east += count * this.dE;
        break;
      case "L":
        angle = (count * Math.PI) / 180;
        dX = this.dE * Math.cos(angle) - this.dN * Math.sin(angle);
        dY = this.dE * Math.sin(angle) + this.dN * Math.cos(angle);
        this.dE = Math.round(dX);
        this.dN = Math.round(dY);
        break;
      case "R":
        angle = -(count * Math.PI) / 180;
        dX = this.dE * Math.cos(angle) - this.dN * Math.sin(angle);
        dY = this.dE * Math.sin(angle) + this.dN * Math.cos(angle);
        this.dE = Math.round(dX);
        this.dN = Math.round(dY);
        break;
      default:
        throw new Error(`invalid instruction ${dir}`);
    }
  };

  rotate = (dir, amount) => {
    // change this.facing
    const numTurns = amount / 90;
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

  // part 2 rules
  processInstructions2 = () => {
    this.instructionList.forEach((item) => {
      const regex = /([NSEWLRF])(\d+)/;
      const [, dir, amount] = item.match(regex);
      this.move2(dir, parseInt(amount));
    });
  };
}

const instructions = fs.readFileSync("input.txt", "utf-8").split("\n");

const boaty = new Directions(instructions, 1, 10);

boaty.processInstructions2();

console.log(boaty.getManhattenDistance());
