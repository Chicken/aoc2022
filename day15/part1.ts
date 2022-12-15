const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => {
    const [sx, sy, bx, by] = l.match(/\-?\d+/g)!.map(Number);
    return { sx, sy, bx, by };
});

const manhattan = (x1: number, y1: number, x2: number, y2: number) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const key = (x: number, y: number) => `${x},${y}`;

const found = new Map<string, string>();

const countedRow = 2000000;

for (const { sx, sy, bx, by } of input) {
    const dist = manhattan(sx, sy, bx, by);
    found.set(key(sx, sy), "S");
    found.set(key(bx, by), "B");
    for (const diff of Array(dist).fill(0).map((_, i) => i)) {
        if (manhattan(sx, sy, sx + diff, countedRow) <= dist) {
            if (!found.has(key(sx + diff, countedRow))) found.set(key(sx + diff, countedRow), "#");
            if (!found.has(key(sx - diff, countedRow))) found.set(key(sx - diff, countedRow), "#");
        }
    }
}

let ans = 0;
for (const [key, val] of found) {
    if (val == "#" && key.split(",").map(Number)[1] === countedRow) ans++;
}

console.log(ans);
