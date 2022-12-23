const [rawMap, rawInstructions] = Deno.readTextFileSync("input").trimEnd().split("\n\n");

const map = rawMap.split("\n").map((l) => l.trimEnd().split(""));

const instructions = rawInstructions.match(/\d+|\w/g)?.map((e) => isNaN(parseInt(e, 10)) ? e : parseInt(e, 10))!;

type Coords = [number, number];
type Facing = [number, number];

const coords: Coords = [0, map[0].findIndex((e) => e === ".")];
const dir: Coords = [0, 1];

/**
 * ..1.
 * 234.
 * ..56
 */
// example input portals
// const l = 4;
// const portals: [Coords, Coords, Facing, Coords, Coords, Facing][] = [
//     [[0, 8], [0, 11], [-1, 0], [4, 3], [4, 0], [-1, 0]], // top1 to top2
//     [[0, 11], [3, 11], [0, 1], [11, 15], [8, 15], [0, 1]], // right1 to right6
//     [[4, 11], [7, 11], [0, 1], [8, 15], [8, 12], [-1, 0]], // right4 to top6
//     [[11, 12], [11, 15], [1, 0], [7, 0], [4, 0], [0, -1]], // bottom6 to left2
//     [[11, 8], [11, 11], [1, 0], [7, 3], [7, 0], [1, 0]], // bottom5 to bottom2
//     [[8, 8], [15, 8], [0, -1], [7, 7], [7, 4], [1, 0]], // left5 to bottom3
//     [[4, 4], [4, 7], [-1, 0], [0, 8], [3, 8], [0, -1]], // top3 to left1
// ];
/**
 * .21
 * .3.
 * 54.
 * 6..
 */
const l = 50;
const portals: [Coords, Coords, Facing, Coords, Coords, Facing][] = [
    [[0, l * 2], [0, l * 3], [-1, 0], [l * 4 - 1, 0], [l * 4 - 1, l - 1], [1, 0]], // top1 to bottom6
    [[0, l * 3 - 1], [l - 1, l * 3 - 1], [0, 1], [l * 3 - 1, l * 2 - 1], [l * 2, l * 2 - 1], [0, 1]], // right1 to right4
    [[l * 1 - 1, l * 2], [l * 1 - 1, l * 3 - 1], [1, 0], [l, l * 2 - 1], [l * 2 - 1, l * 2 - 1], [0, 1]], // bottom1 to right3
    [[l * 3 - 1, l], [l * 3 - 1, l * 2 - 1], [1, 0], [l * 3, l - 1], [l * 4 - 1, l - 1], [0, 1]], // bottom4 to right6
    [[l * 3, 0], [l * 4 - 1, 0], [0, -1], [0, l], [0, l * 2 - 1], [-1, 0]], // left6 to top2
    [[l * 2, 0], [l * 3 - 1, 0], [0, -1], [l - 1, l], [0, l], [0, -1]], // left5 to left2
    [[l * 2, 0], [l * 2, l - 1], [-1, 0], [l, l], [l * 2 - 1, l], [0, -1]], // top5 to left3
];

const lookup = new Map<string, [Coords, Facing]>();

for (const portal of portals) {
    const [start1, end1, dir1, start2, end2, dir2] = portal;
    for (let i = 0; i < l; i++) {
        const first: Coords = [
            start1[0] + Math.sign(end1[0] - start1[0]) * i,
            start1[1] + Math.sign(end1[1] - start1[1]) * i,
        ];
        const second: Coords = [
            start2[0] + Math.sign(end2[0] - start2[0]) * i,
            start2[1] + Math.sign(end2[1] - start2[1]) * i,
        ];
        lookup.set(`${first},${dir1}`, [second, dir2.map((v) => -v) as Facing]);
        lookup.set(`${second},${dir2}`, [first, dir1.map((v) => -v) as Facing]);
    }
}

for (const inst of instructions) {
    if (typeof (inst) === "number") {
        for (let i = 0; i < inst; i++) {
            coords[0] += dir[0];
            coords[1] += dir[1];
            const newTile = map[coords[0]]?.[coords[1]];
            if (!newTile || newTile === " ") {
                const [
                    loopTile,
                    loopDir,
                ] = lookup.get(`${coords.map((e, i) => e - dir[i])},${dir}`)!;
                if (map[loopTile[0]][loopTile[1]] === "#") {
                    coords[0] -= dir[0];
                    coords[1] -= dir[1];
                    break;
                }
                coords[0] = loopTile[0];
                coords[1] = loopTile[1];
                dir[0] = loopDir[0];
                dir[1] = loopDir[1];
            }
            if (newTile === "#") {
                coords[0] -= dir[0];
                coords[1] -= dir[1];
                break;
            }
        }
    } else {
        if (inst === "L") {
            const newDir = {
                "0,1": [-1, 0],
                "-1,0": [0, -1],
                "0,-1": [1, 0],
                "1,0": [0, 1],
            }[dir.join(",")]!;
            dir[0] = newDir[0];
            dir[1] = newDir[1];
        } else if (inst === "R") {
            const newDir = {
                "0,1": [1, 0],
                "1,0": [0, -1],
                "0,-1": [-1, 0],
                "-1,0": [0, 1],
            }[dir.join(",")]!;
            dir[0] = newDir[0];
            dir[1] = newDir[1];
        }
    }
}

function dirScore(dir: Coords): number {
    const str = dir.join(",");
    return {
        "0,1": 0,
        "1,0": 1,
        "0,-1": 2,
        "-1,0": 3,
    }[str]!;
}

console.log((coords[0] + 1) * 1000 + (coords[1] + 1) * 4 + dirScore(dir));
