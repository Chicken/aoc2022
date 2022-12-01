const input = require("fs").readFileSync("input", "utf-8").trim().split("\n\n").map(e => e.trim().split("\n").map(s => s.trim()).map(Number));

console.log(Math.max(...input.map(e => e.reduce((a, c) => a + c, 0))));
