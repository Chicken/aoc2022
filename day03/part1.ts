const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => {
    l = l.trim();
    const length = l.length / 2;
    const first = l.slice(0, length);
    const second = l.slice(length);
    return [first, second];
});

const ans = input.reduce((a, [f, s]) => {
    const common = f.split("").find((c) => s.indexOf(c) !== -1);
    if (!common) throw new Error("no common");
    if (common >= "a" && common <= "z") return a + common.charCodeAt(0) - 96;
    else return a + common.charCodeAt(0) - 64 + 26;
}, 0);

console.log(ans);
