const input = Deno.readTextFileSync("input").trim().split("\n").map((l) =>
    l.trim().split(",").map((r) => r.split("-").map(Number))
);

let ans = 0;

for (const [f, s] of input) {
    if (
        (f[0] <= s[0] && f[1] >= s[1]) ||
        (s[0] <= f[0] && s[1] >= f[1])
    ) ans++;
}

console.log(ans);
