const fs = require("fs");

const countAnswers = (answerList) => {
  let count = 0;
  answerList.forEach((a) => {
    a = a.replace(/\s/g, "");
    count += new Set(a).size;
  });
  return count;
};

const answerList = fs.readFileSync("input.txt", "utf-8").split("\n\n");

console.log(countAnswers(answerList));
