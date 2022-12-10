const input = Deno.readTextFileSync("input").trim().split("\n").map((l) =>
    l.split(" ").map((e, i) => i ? parseInt(e) : e) as [string, number]
);

let X = 1;
let ans = 0;
let cycle = 1;

for (const [inst, cnt] of input) {
    if (inst === "noop") {
        cycle++;
        if ((cycle - 20) % 40 == 0) ans += cycle * X;
        continue;
    }
    if (inst === "addx") {
        cycle++;
        if ((cycle - 20) % 40 == 0) ans += cycle * X;
        cycle++;
        X += cnt;
        if ((cycle - 20) % 40 == 0) ans += cycle * X;
    }
}

console.log(ans);
