const input = Deno.readTextFileSync("input").trim().split("\n").map((l) =>
    l.trim().split(" -> ").map((c) => c.trim().split(",").map(Number) as [number, number])
);

const blocked = new Set<string>();

const key = (x: number, y: number) => `${x},${y}`;

for (const paths of input) {
    for (let i = 0; i < paths.length - 1; i++) {
        let startPoint = paths[i];
        let endPoint = paths[i + 1];
        if (startPoint[0] !== endPoint[0]) {
            if (startPoint[0] > endPoint[0]) [startPoint, endPoint] = [endPoint, startPoint];
            for (let x = startPoint[0]; x <= endPoint[0]; x++) {
                blocked.add(key(x, startPoint[1]));
            }
        } else {
            if (startPoint[1] > endPoint[1]) [startPoint, endPoint] = [endPoint, startPoint];
            for (let y = startPoint[1]; y <= endPoint[1]; y++) {
                blocked.add(key(startPoint[0], y));
            }
        }
    }
}

const lowest = Math.max(...input.map((p) => p.map((p2) => p2[1])).flat()) + 2;
let amount = 0;

sand:
while (true) {
    const sand = [500, 0] as [number, number];
    if (blocked.has(key(500, 0))) break sand;

    lower:
    while (sand[1] < lowest) {
        for (const dx of [0, -1, 1]) {
            const next = [sand[0] + dx, sand[1] + 1];
            if (blocked.has(key(next[0], next[1])) || next[1] === lowest) continue;
            sand[0] = next[0];
            sand[1] = next[1];
            continue lower;
        }
        break lower;
    }
    amount++;
    blocked.add(key(...sand));
}

console.log(amount);
