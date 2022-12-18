const input = Deno.readTextFileSync("input").trim().split("\n");

const rocks = new Set<string>();

for (const rock of input) rocks.add(rock);

let ans = 0;

const key = (x: number, y: number, z: number) => `${x},${y},${z}`;

for (const rock of rocks) {
    const [x, y, z] = rock.split(",").map(Number);
    ans += 6;
    for (const d of [-1, 1]) {
        if (rocks.has(key(x + d, y, z))) ans--;
        if (rocks.has(key(x, y + d, z))) ans--;
        if (rocks.has(key(x, y, z + d))) ans--;
    }
}

console.log(ans);
