const fs = require("fs");

class SeatGrid {
  /**
   * . floor - doesn't change
   * L empty seat
   * # occupied seat
   */
  constructor(grid) {
    this.grid = grid;
    this.yLength = grid.length;
    this.xLength = grid[0].length;

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
    const status = [];
    this.adjSeatPositions.forEach((adj) => {
      const newX = seatX + adj[0];
      const newY = seatY + adj[1];
      if (newX >= 0 && newX < this.xLength) {
        if (newY >= 0 && newY < this.yLength) {
          status.push(this.getSeatStatus(newX, newY));
        }
      }
    });
    return status;
  };

  // transform an individual seat
  transformSeat = (x, y) => {
    let status = this.getSeatStatus(x, y);
    let countAdjOccupied = countOccupiedSeats(this.getAdjacentSeats(x, y));

    if (status === ".") {
      return ".";
    }
    if (status === "L") {
      // currently empty
      if (countAdjOccupied == 0) {
        return "#";
      } else return "L";
    }
    if (status === "#") {
      if (countAdjOccupied >= 4) {
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
      newGrid = new SeatGrid(newGrid).transformGrid();
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

const grid = new SeatGrid(seats);

const transformedSeats = grid.transformGrid();

//console.log(transformedSeats);

console.log(countOccupiedSeats(transformedSeats));
