const input = Deno.readTextFileSync("input").trim().split("");

const grid = new Set<string>();
const minc = 0;
const maxc = 6;
let maxr = -1;
let additional = 0;

const key = (r: number, c: number) => `${r},${c}`;

const shapes = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`.split("\n\n").map((e) => e.split("\n").map((l) => l.split("")));

const lookup = new Map<string, [number, number]>();

let inst = 0;
for (let i = 0; i < 1e12; i++) {
    const shape = shapes[i % shapes.length];
    let r = maxr + 4;
    let c = 2;
    while (true) {
        const dir = input[inst % input.length];
        inst++;
        if (dir === ">") {
            const nc = c + 1;
            if (
                !shape.some((sr, sri) => {
                    const lastSolid = sr.lastIndexOf("#");
                    if (
                        nc + lastSolid > maxc || grid.has(key(r + shape.length - 1 - sri, nc + lastSolid))
                    ) return true;
                })
            ) c = nc;
        } else {
            const nc = c - 1;
            if (
                !shape.some((sr, sri) => {
                    const firstSolid = sr.indexOf("#");
                    if (
                        nc + firstSolid < minc ||
                        grid.has(key(r + shape.length - 1 - sri, nc + firstSolid))
                    ) return true;
                })
            ) c = nc;
        }
        const nr = r - 1;
        if (
            shape[0].map((_, i) => shape.map((r) => r[i])).some((sc, sci) => {
                const lastSolid = sc.reverse().indexOf("#");
                if (nr + lastSolid < 0 || grid.has(key(nr + lastSolid, c + sci))) return true;
            })
        ) {
            for (let sr = 0; sr < shape.length; sr++) {
                for (let sc = 0; sc < shape[sr].length; sc++) {
                    if (shape[sr][sc] === "#") grid.add(key(r + shape.length - 1 - sr, c + sc));
                }
            }
            maxr = Math.max(maxr, r + shape.length - 1);

            const topRows = [];
            for (let sr = maxr; sr > maxr - 10; sr--) {
                for (let sc = 0; sc <= maxc; sc++) {
                    const k = key(sr, sc);
                    if (grid.has(k)) topRows.push(key(maxr - sr, sc));
                }
            }

            const sig = [i % shapes.length, inst % input.length, topRows.join(".")].join("-");
            if (lookup.has(sig)) {
                const [oldIndex, oldMaxR] = lookup.get(sig)!;
                const dr = maxr - oldMaxR;
                const di = i - oldIndex;
                const cycles = Math.floor((1e12 - i) / di);
                additional += dr * cycles;
                i += di * cycles;
            }
            lookup.set(sig, [i, maxr]);
            break;
        }
        r = nr;
    }
}

console.log(maxr + additional + 1);
