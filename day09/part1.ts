const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => {
    const [dir, mov] = l.split(" ");
    return [dir, parseInt(mov)] as ["U" | "D" | "L" | "R", number];
});

const head: [number, number] = [0, 0];
const tail: [number, number] = [0, 0];

const visited = new Set();
visited.add(tail.toString());

for (const [dir, mov] of input) {
    for (let i = 0; i < mov; i++) {
        switch (dir) {
            case "U": {
                head[0] += 1;
                if (Math.abs(tail[0] - head[0]) > 1) {
                    tail[0] = head[0] - 1;
                    if (tail[1] !== head[1]) {
                        tail[1] = head[1];
                    }
                }
                break;
            }
            case "D": {
                head[0] -= 1;
                if (Math.abs(tail[0] - head[0]) > 1) {
                    tail[0] = head[0] + 1;
                    if (tail[1] !== head[1]) {
                        tail[1] = head[1];
                    }
                }
                break;
            }
            case "L": {
                head[1] -= 1;
                if (Math.abs(tail[1] - head[1]) > 1) {
                    tail[1] = head[1] + 1;
                    if (tail[0] !== head[0]) {
                        tail[0] = head[0];
                    }
                }
                break;
            }
            case "R": {
                head[1] += 1;
                if (Math.abs(tail[1] - head[1]) > 1) {
                    tail[1] = head[1] - 1;
                    if (tail[0] !== head[0]) {
                        tail[0] = head[0];
                    }
                }
                break;
            }
        }
        visited.add(tail.toString());
    }
}

console.log(visited.size);
