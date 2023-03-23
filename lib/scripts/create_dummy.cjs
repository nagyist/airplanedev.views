"use strict";

const fs = require("fs");

if (process.argv.length < 4) {
  console.log(
    "Usage: node " + process.argv[1] + " <input file name> <output file name>"
  );
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

const data = fs.readFileSync(inputFile, { encoding: "utf8" });

const exportsRegexp =
  /export {(?:(?:\s*\w+,*\s*)|(?:\s*[\w$]+ as \w+,*\s*))+};/;
const exportsStr = data.match(exportsRegexp)[0];

const individualExportsRegexp =
  /(?:\s*(\w+),*[^\S\r\n]*\n)|(?:\s*[\w$]+ as (\w+),*[^\S\r\n]*\n)/g;
const individualExports = [...exportsStr.matchAll(individualExportsRegexp)].map(
  (e) => e[1] ?? e[2]
);

const outputStr =
  '"use strict";\n' +
  individualExports.map((e) => "exports." + e + " = function(){};\n").join("");

fs.writeFileSync(outputFile, outputStr);

console.log("Wrote dummy file " + outputFile);
