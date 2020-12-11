const fs = require("fs");

class SeatGrid {
  /**
   * . floor - doesn't change
   * L empty seat
   * # occupied seat
   */
  constructor(grid, occupiedChange, rule) {
    this.grid = grid;
    this.yLength = grid.length;
    this.xLength = grid[0].length;
    this.occupiedChange = occupiedChange; // how many seats around us are occupied before we move
    this.rule = rule; // "adjacent" or "visible"

    // relative x,y positions
    this.adjSeatPositions = [
      [-1, -1], //TL
      [0, -1], //T
      [1, -1], //TR
      [-1, 0], //L
      [1, 0], // R
      [-1, 1], //BL
      [0, 1], //B
      [1, 1], //BR
    ];
  }

  // what is our seat?
  getSeatStatus = (x, y) => {
    return this.grid[y].charAt(x);
  };

  // what seats are around us?
  getAdjacentSeats = (seatX, seatY) => {
    const adjacent = [];
    this.adjSeatPositions.forEach((adj) => {
      const newX = seatX + adj[0];
      const newY = seatY + adj[1];
      if (newX >= 0 && newX < this.xLength) {
        if (newY >= 0 && newY < this.yLength) {
          adjacent.push(this.getSeatStatus(newX, newY));
        }
      }
    });
    return adjacent;
  };

  seatInDirection(seatX, seatY, moveX, moveY) {
    const newX = seatX + moveX;
    const newY = seatY + moveY;
    if (newX >= 0 && newX < this.xLength) {
      if (newY >= 0 && newY < this.yLength) {
        const newSeat = this.getSeatStatus(newX, newY);
        if (newSeat != ".") {
          return this.getSeatStatus(newX, newY);
        } else {
          return this.seatInDirection(newX, newY, moveX, moveY);
        }
      }
    }
  }

  // what seats are visible in each direction (part2)
  getVisibleSeats = (seatX, seatY) => {
    const visible = [];
    // loop through adj positions
    // if it's not a seat, look again in this direction
    // if it's a seat (L or #), add to our list
    this.adjSeatPositions.forEach((adj) => {
      const newSeat = this.seatInDirection(seatX, seatY, adj[0], adj[1]);
      if (newSeat) visible.push(newSeat);
    });
    return visible;
  };

  // transform an individual seat
  transformSeat = (x, y) => {
    let status = this.getSeatStatus(x, y);
    let countNearbySeats = countOccupiedSeats(this.getAdjacentSeats(x, y));
    if (this.rule == "visible") {
      countNearbySeats = countOccupiedSeats(this.getVisibleSeats(x, y));
    }
    if (status === "L") {
      // currently empty
      if (countNearbySeats === 0) {
        return "#";
      } else return "L";
    }
    if (status === "#") {
      if (countNearbySeats >= this.occupiedChange) {
        return "L";
      } else return "#";
    }
    return status;
  };

  // transform all our data
  transformGrid = () => {
    let newGrid = [];
    // loop through it all
    for (let y = 0; y < this.yLength; y++) {
      let newRow = [];
      for (let x = 0; x < this.xLength; x++) {
        const newSeat = this.transformSeat(x, y);
        newRow.push(newSeat);
      }
      newGrid.push(newRow.join(""));
    }

    if (!arrayEquals(this.grid, newGrid)) {
      // go again
      newGrid = new SeatGrid(
        newGrid,
        this.occupiedChange,
        this.rule
      ).transformGrid();
    }
    return newGrid;
  };
}

// how many # in our list?
const countOccupiedSeats = (data) => {
  return (JSON.stringify(data).match(/#/g) || []).length;
};

// compare two arrays (values)
// pinched shamelessly from the internet
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

const seats = fs.readFileSync("input.txt", "utf-8").split("\n");
// part one - adjacent seats
const part1Grid = new SeatGrid(seats, 4, "adjacent");

const transformedSeats = part1Grid.transformGrid();
//console.log(transformedSeats);
console.log(countOccupiedSeats(transformedSeats));

// part 2 - visible seats
const part2Grid = new SeatGrid(seats, 5, "visible");
const transformed = part2Grid.transformGrid();

//console.log(transformed);

console.log(countOccupiedSeats(transformed));
