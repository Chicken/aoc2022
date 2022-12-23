const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.split(""));

type Elf = `${number},${number}`;

const elves = new Set<Elf>();

const key = (r: number, c: number): Elf => `${r},${c}`;
const coords = (key: Elf): [number, number] => key.split(",").map(Number) as [number, number];

for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
        if (input[r][c] === "#") elves.add(key(r, c));
    }
}

const consideredDirection: Elf[][] = [
    ["-1,-1", "-1,0", "-1,1"],
    ["1,-1", "1,0", "1,1"],
    ["-1,-1", "0,-1", "1,-1"],
    ["-1,1", "0,1", "1,1"],
];

let rounds = 0;

while (true) {
    rounds++;

    const proposals = new Map<Elf, Elf | null>();
    for (const elf of elves) {
        const [r, c] = coords(elf);
        const neighbours = new Set<string>();
        for (const dr of [-1, 0, 1]) {
            for (const dc of [-1, 0, 1]) {
                if (dr === 0 && dc === 0) continue;
                const nelf = key(r + dr, c + dc);
                if (elves.has(nelf)) {
                    neighbours.add(nelf);
                }
            }
        }
        if (neighbours.size > 0) {
            for (const dadj of consideredDirection) {
                const adj = dadj.map(coords).map(([dr, dc]) => key(r + dr, c + dc));
                if (adj.every((a) => !neighbours.has(a))) {
                    const middle = adj[1];
                    if (proposals.has(middle)) proposals.set(middle, null);
                    else proposals.set(middle, elf);
                    break;
                }
            }
        }
    }

    consideredDirection.push(consideredDirection.shift()!);

    if (Array.from(proposals.values()).filter((e) => e != null).length === 0) {
        console.log(rounds);
        break;
    }

    for (const [destination, elf] of proposals) {
        if (elf) {
            elves.delete(elf);
            elves.add(destination);
        }
    }
}
