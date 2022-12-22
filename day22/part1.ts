const [rawMap, rawInstructions] = Deno.readTextFileSync("input").trimEnd().split("\n\n");

const map = rawMap.split("\n").map((l) => l.trimEnd().split(""));

const instructions = rawInstructions.match(/\d+|\w/g)?.map((e) => isNaN(parseInt(e, 10)) ? e : parseInt(e, 10))!;

const coords: [number, number] = [0, map[0].findIndex((e) => e === ".")];
const dir: [number, number] = [0, 1];

for (const inst of instructions) {
    if (typeof (inst) === "number") {
        for (let i = 0; i < inst; i++) {
            coords[0] += dir[0];
            coords[1] += dir[1];
            const newTile = map[coords[0]]?.[coords[1]];
            if (!newTile || newTile === " ") {
                if (dir[0] !== 0) {
                    const newCoord = map.map((r) => r[coords[1]])[dir[0] === 1 ? "findIndex" : "findLastIndex"]((e) =>
                        e && e !== " "
                    );
                    if (map[newCoord][coords[1]] === "#") {
                        coords[0] -= dir[0];
                        break;
                    }
                    coords[0] = newCoord;
                } else {
                    const newCoord = map[coords[0]][dir[1] === 1 ? "findIndex" : "findLastIndex"]((e) =>
                        e && e !== " "
                    );
                    if (map[coords[0]][newCoord] === "#") {
                        coords[1] -= dir[1];
                        break;
                    }
                    coords[1] = newCoord;
                }
            }
            if (newTile === "#") {
                coords[0] -= dir[0];
                coords[1] -= dir[1];
                break;
            }
        }
    } else {
        // heck smart math i cant think so hardcode it is
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

function dirScore(dir: [number, number]): number {
    const str = dir.join(",");
    return {
        "0,1": 0,
        "1,0": 1,
        "0,-1": 2,
        "-1,0": 3,
    }[str]!;
}

console.log((coords[0] + 1) * 1000 + (coords[1] + 1) * 4 + dirScore(dir));
