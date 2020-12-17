class NumberGame {
  constructor(input) {
    this.turn = 1; // starting at zero made things go weird
    this.played = new Map(); // map of numbers played - key: number, value: lastPosition

    // put our input values into the map
    input.forEach((i) => {
      this.played.set(i, this.turn);
      this.value = i;
      this.turn++;
    });
  }

  play = (maxTurns) => {
    while (this.turn <= maxTurns) {
      let newValue;
      //console.log(this.played);
      if (this.played.has(this.value)) {
        newValue = this.turn - 1 - this.played.get(this.value);
      } else {
        newValue = 0;
      }
      console.log(`turn ${this.turn}: ${newValue}`);

      this.played.set(this.value, this.turn - 1);
      this.value = newValue;
      this.turn++;
    }
    console.log(this.value);
  };
}

const input = [8, 0, 17, 4, 1, 12];
const game = new NumberGame(input);
game.play(2020);
