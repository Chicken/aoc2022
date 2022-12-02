const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(" "));

const translate: Record<string, [string, number]> = {
    "X": ["A", 1],
    "Y": ["B", 2],
    "Z": ["C", 3],
};

let score = 0;

for (const [opponent, _you] of input) {
    const [you, shapeScore] = translate[_you];
    score += shapeScore;
    if (opponent === you) {
        score += 3;
        continue;
    }
    if (
        (opponent === "A" && you === "C") ||
        (opponent === "B" && you === "A") ||
        (opponent === "C" && you === "B")
    ) continue;
    score += 6;
}

console.log(score);
