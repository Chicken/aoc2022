const input = Deno.readTextFileSync("input").trim().split("");

const grid = new Set<string>();
const minc = 0;
const maxc = 6;
let maxr = -1;

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

let inst = 0;
for (let i = 0; i < 2022; i++) {
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
            break;
        }
        r = nr;
    }
    maxr = Math.max(maxr, r + shape.length - 1);
}

console.log(maxr + 1);
