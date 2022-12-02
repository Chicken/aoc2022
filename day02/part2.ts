type Move = "A" | "B" | "C";
const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(" ")) as [Move, Move][];

const outcomes: Record<string, Record<Move, Move>> = {
    X: {
        "A": "C",
        "B": "A",
        "C": "B",
    },
    Y: {
        "A": "A",
        "B": "B",
        "C": "C",
    },
    Z: {
        "A": "B",
        "B": "C",
        "C": "A",
    },
};

const scores = {
    "A": 1,
    "B": 2,
    "C": 3,
};

let score = 0;

for (const [opponent, outcome] of input) {
    const you = outcomes[outcome][opponent];
    score += scores[you];
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
