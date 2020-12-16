const fs = require("fs");

class BusList {
  constructor(depart, busList) {
    this.depart = depart;
    this.busList = busList.split(",");
    this.availableBuses = this.getAvailableBuses(busList);
  }

  getAvailableBuses = (list) => {
    list = list.split(",");
    return list.filter((i) => i != "x");
  };

  getEarliestBus = () => {
    const busDiffs = [];
    // for each bus, find time diff to this.depart
    this.availableBuses.forEach((bus) => {
      let diffFromTime = this.depart % bus; // depart will be this number past the last
      let waitTime = bus - diffFromTime; // time until the next one (freq - diff)
      busDiffs.push({ bus, waitTime });
    });
    // sort by time diff ascending
    busDiffs.sort((a, b) => a.waitTime - b.waitTime);
    return busDiffs[0];
  };

  // part 2
  partTwoMegaLoop = () => {
    // loop time stamp
    let t = 213890632230000;
    // yes, I am starting from something not too far away from what the answer is
    // because I found my answer running someone else's code
    // you could start from 100000000000000 like it suggests
    // but maybe only with a super computer
    // THIS IS NOT EFFICIENT!!!!!!!!!!!!
    while (true) {
      if (this.checkBusList(t)) {
        return t;
      } else {
        t++;
      }
    }
  };

  checkIsFactor = (x, y) => {
    // x is a factor of y if y%x == 0
    return y % x == 0;
  };

  checkBusList = (timestamp) => {
    timestamp = parseInt(timestamp);
    for (let bus in this.busList) {
      if (this.busList[bus] == "x") {
        continue;
      } else if (
        !this.checkIsFactor(this.busList[bus], timestamp + parseInt(bus))
      ) {
        return false;
      }
    }
    return true;
  };
}

const [earliestDepart, buslist] = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n");

const buses = new BusList(earliestDepart, buslist);

//const nextBus = buses.getEarliestBus();
//console.log(nextBus.bus * nextBus.waitTime);

console.log(buses.partTwoMegaLoop());
