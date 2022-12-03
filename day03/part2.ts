const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim());

let ans = 0;
for (let i = 0; i < input.length; i += 3) {
    const items = input.slice(i, i + 3);
    const common = items[0].split("").find((c) => items[1].indexOf(c) !== -1 && items[2].indexOf(c) !== -1);
    if (!common) throw new Error("no common");
    if (common >= "a" && common <= "z") ans += common.charCodeAt(0) - 96;
    else ans += common.charCodeAt(0) - 64 + 26;
}

console.log(ans);
