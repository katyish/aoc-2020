const fs = require("fs");

class BusList {
  constructor(depart, busList) {
    this.depart = depart;
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
}

const [earliestDepart, buslist] = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n");

const buses = new BusList(earliestDepart, buslist);

const nextBus = buses.getEarliestBus();
console.log(nextBus.bus * nextBus.waitTime);
