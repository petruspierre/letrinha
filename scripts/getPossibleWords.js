const fs = require("fs");
const path = require("path");
const readline = require("readline");
const wordList = require("./wordData");
const nameList = require("./nomesProprios");

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
  input: fs.createReadStream(path.resolve(__dirname, "..", "tf.csv")),
});

readInterface.on("line", function (line) {
  const [word, freq] = line.split(",");

  const wordLength = word.length;
  const category = result[wordLength];

  if (wordLength < 5 || wordLength > 6) return;

  if (
    (wordLength === 5 && freq < 1000000) ||
    (wordLength === 6 && freq < 1000000)
  )
    return;

  if (!wordList[wordLength].includes(word)) return;
  if (nameList[wordLength].includes(word)) return;

  console.log(word);

  const parsedWord = removeAccents(word);

  if (!category) {
    result[wordLength] = [parsedWord];
  } else {
    result[wordLength] = [...category, parsedWord];
  }
});

readInterface.on("close", function () {
  console.log("5 LENGTH: ", result["5"].length);
  console.log("6 LENGTH: ", result["6"].length);

  fs.writeFile(
    path.resolve(__dirname, "possibleWords.json"),
    JSON.stringify(result),
    { flag: "a+" },
    (err) => {}
  );
});
