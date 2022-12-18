const input = Deno.readTextFileSync("input").trim().split("\n");

const rocks = new Set<string>();

const key = (x: number, y: number, z: number) => `${x},${y},${z}`;

for (const rock of input) rocks.add(rock);

const minDim = 0;
const maxDim = 20;

let ans = 0;

const inside = new Set<string>();
const outside = new Set<string>();

function isInside(x: number, y: number, z: number) {
    if (inside.has(key(x, y, z))) true;
    if (outside.has(key(x, y, z))) false;
    const visited = new Set<string>();
    const queue: [number, number, number][] = [[x, y, z]];
    while (queue.length) {
        const [x, y, z] = queue.shift()!;
        if (visited.has(key(x, y, z))) continue;
        visited.add(key(x, y, z));
        for (const [dx, dy, dz] of [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]]) {
            const [x2, y2, z2] = [x + dx, y + dy, z + dz];
            const k = key(x2, y2, z2);
            if (visited.has(k)) continue;
            if (rocks.has(k)) continue;
            if (outside.has(k) || [x2, y2, z2].some((v) => v < minDim || v > maxDim)) {
                visited.forEach((k) => outside.add(k));
                return false;
            }

            queue.push([x2, y2, z2]);
        }
    }
    visited.forEach((k) => inside.add(k));
    return true;
}

for (const rock of rocks) {
    const [x, y, z] = rock.split(",").map(Number);
    ans += 6;
    for (const d of [-1, 1]) {
        if (rocks.has(key(x + d, y, z)) || isInside(x + d, y, z)) ans--;
        if (rocks.has(key(x, y + d, z)) || isInside(x, y + d, z)) ans--;
        if (rocks.has(key(x, y, z + d)) || isInside(x, y, z + d)) ans--;
    }
}

console.log(ans);
