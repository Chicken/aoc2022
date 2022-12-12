const input = Deno.readTextFileSync("input").trim().split("\n").map((l) =>
    l.trim().split("").map((c) => c.charCodeAt(0))
);

const S = [
    input.findIndex((r) => r.includes(83)),
    input.find((r) => r.includes(83))!.findIndex((c) => c === 83),
] as [number, number];
input[S[0]][S[1]] = 97;

const get = (r: number, c: number) => input[r]?.[c];
const key = (r: number, c: number) => `${r},${c}`;

function distance(start: [number, number]) {
    const queue: [number, number][] = [start];
    const distances: Record<string, number> = Object.fromEntries(
        input.flatMap((r, ri) => r.map((_, ci) => [[ri, ci], Infinity])),
    );
    distances[key(...start)] = 0;

    while (queue.length) {
        const [cr, cc] = queue.shift()!;
        const current = get(cr, cc);
        for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const next = get(cr + dr, cc + dc);
            if (!next) continue;
            if (next === 69 && 122 - current <= 1) {
                return distances[key(cr, cc)] + 1;
            }
            if (next - current > 1 || distances[key(cr + dr, cc + dc)] !== Infinity) continue;
            distances[key(cr + dr, cc + dc)] = distances[key(cr, cc)] + 1;
            queue.push([cr + dr, cc + dc]);
        }
    }
}

let shortest = Infinity;

for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
        if (input[r][c] === 97) {
            const d = distance([r, c])!;
            if (d < shortest) {
                shortest = d;
            }
        }
    }
}

console.log(shortest);
