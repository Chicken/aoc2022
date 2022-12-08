const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split("").map(Number));

let highest = 0;

for (let r = 1; r < input.length - 1; r++) {
    for (let c = 1; c < input.length - 1; c++) {
        const v = input[r][c];
        const left = input[r].slice(0, c).reverse();
        const right = input[r].slice(c + 1);
        const up = input.map((r) => r[c]).slice(0, r).reverse();
        const down = input.map((r) => r[c]).slice(r + 1);
        let score = 1;
        const leftIndex = left.findIndex((t) => t >= v);
        if (leftIndex !== -1) score *= leftIndex + 1;
        else score *= left.length;
        const rightIndex = right.findIndex((t) => t >= v);
        if (rightIndex !== -1) score *= rightIndex + 1;
        else score *= right.length;
        const upIndex = up.findIndex((t) => t >= v);
        if (upIndex !== -1) score *= upIndex + 1;
        else score *= up.length;
        const downIndex = down.findIndex((t) => t >= v);
        if (downIndex !== -1) score *= downIndex + 1;
        else score *= down.length;
        if (score > highest) highest = score;
    }
}

console.log(highest);
