const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => {
    const [dir, mov] = l.split(" ");
    return [dir, parseInt(mov)] as ["U" | "D" | "L" | "R", number];
});

const head: [number, number] = [0, 0];
const tails: [number, number][] = Array(9).fill(0).map(() => [0, 0]);

const visited = new Set();
visited.add("0,0");

for (const [dir, mov] of input) {
    for (let i = 0; i < mov; i++) {
        switch (dir) {
            case "U":
                head[0] += 1;
                break;
            case "D":
                head[0] -= 1;
                break;
            case "L":
                head[1] -= 1;
                break;
            case "R":
                head[1] += 1;
                break;
        }
        for (let i = 0; i < tails.length; i++) {
            const target = i ? tails[i - 1] : head;
            const follower = tails[i];
            if (target[0] - follower[0] > 1) {
                follower[0] += 1;
                if (Math.abs(follower[1] - target[1]) == 1) {
                    follower[1] = target[1];
                } else if (Math.abs(follower[1] - target[1]) > 1) {
                    if (follower[1] > target[1]) {
                        follower[1] -= 1;
                    } else {
                        follower[1] += 1;
                    }
                }
            }
            if (follower[0] - target[0] > 1) {
                follower[0] -= 1;
                if (Math.abs(follower[1] - target[1]) == 1) {
                    follower[1] = target[1];
                } else if (Math.abs(follower[1] - target[1]) > 1) {
                    if (follower[1] > target[1]) {
                        follower[1] -= 1;
                    } else {
                        follower[1] += 1;
                    }
                }
            }
            if (target[1] - follower[1] > 1) {
                follower[1] += 1;
                if (Math.abs(follower[0] - target[0]) == 1) {
                    follower[0] = target[0];
                } else if (Math.abs(follower[0] - target[0]) > 1) {
                    if (follower[0] > target[0]) {
                        follower[0] -= 1;
                    } else {
                        follower[0] += 1;
                    }
                }
            }
            if (follower[1] - target[1] > 1) {
                follower[1] -= 1;
                if (Math.abs(follower[0] - target[0]) == 1) {
                    follower[0] = target[0];
                } else if (Math.abs(follower[0] - target[0]) > 1) {
                    if (follower[0] > target[0]) {
                        follower[0] -= 1;
                    } else {
                        follower[0] += 1;
                    }
                }
            }
        }
        visited.add(tails.at(-1)!.toString());
    }
}

console.log(visited.size);
