const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split("").map(Number));

let ans = (input.length * 2) + (input[0].length * 2) - 4;

for (let r = 1; r < input.length - 1; r++) {
    for (let c = 1; c < input.length - 1; c++) {
        const v = input[r][c];
        const left = input[r].slice(0, c);
        const right = input[r].slice(c + 1);
        const up = input.map((r) => r[c]).slice(0, r);
        const down = input.map((r) => r[c]).slice(r + 1);
        if (Math.max(...left) < v || Math.max(...right) < v || Math.max(...up) < v || Math.max(...down) < v) ans++;
    }
}

console.log(ans);
