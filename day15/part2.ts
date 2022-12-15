const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => {
    const [sx, sy, bx, by] = l.match(/\-?\d+/g)!.map(Number);
    return { sx, sy, bx, by };
});

const manhattan = (x1: number, y1: number, x2: number, y2: number) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const maxDim = 4000000;

for (const { sx, sy, bx, by } of input) {
    const dist = manhattan(sx, sy, bx, by);
    for (const dx of Array(dist * 2 + 2).fill(0).map((_, i) => i - dist - 1)) {
        const dy = dx < 0 ? (dist + 1) + dx : (dist + 1) - dx;
        for (const [x, y] of [[sx + dx, sy + dy], [sx + dx, sy - dy]]) {
            if (x < 0 || x > maxDim || y < 0 || y > maxDim) continue;
            let valid = 0;
            for (const { sx, sy, bx, by } of input) {
                const distBeacon = manhattan(sx, sy, bx, by);
                const distPossible = manhattan(sx, sy, x, y);
                if (distPossible > distBeacon) valid++;
            }
            if (valid === input.length) {
                console.log(x * 4000000 + y);
                Deno.exit(0);
            }
        }
    }
}
