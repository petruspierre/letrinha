const fs = require("fs");
const path = require("path");
const readline = require("readline");

const result = {};

const accentsMap = new Map([
  ["A", "Á|À|Ã|Â|Ä"],
  ["a", "á|à|ã|â|ä"],
  ["E", "É|È|Ê|Ë"],
  ["e", "é|è|ê|ë"],
  ["I", "Í|Ì|Î|Ï"],
  ["i", "í|ì|î|ï"],
  ["O", "Ó|Ò|Ô|Õ|Ö"],
  ["o", "ó|ò|ô|õ|ö"],
  ["U", "Ú|Ù|Û|Ü"],
  ["u", "ú|ù|û|ü"],
  ["C", "Ç"],
  ["c", "ç"],
  ["N", "Ñ"],
  ["n", "ñ"],
]);

const reducer = function (acc, [key]) {
  return acc.replace(new RegExp(accentsMap.get(key), "g"), key);
};

const removeAccents = (text) => [...accentsMap].reduce(reducer, text);

const readInterface = readline.createInterface({
  input: fs.createReadStream(path.resolve(__dirname, "..", "dicio.txt")),
  console: false,
});

readInterface.on("line", function (line) {
  const name = line.split(",")[0];
  const wordLength = name.length;
  const category = result[wordLength];
  const parsedWord = removeAccents(name).toLowerCase();

  if (wordLength < 5 || wordLength > 6) return;

  if (!category) {
    result[wordLength] = [parsedWord];
  } else {
    result[wordLength] = [...category, parsedWord];
  }
});

readInterface.on("close", function () {
  fs.writeFile(
    path.resolve(__dirname, "wordData.json"),
    JSON.stringify(result),
    { flag: "a+" },
    (err) => {}
  );
});
