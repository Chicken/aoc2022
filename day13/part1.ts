const input = Deno.readTextFileSync("input").trim().split("\n\n").map((p) =>
    p.split("\n").map(eval) as [unknown, unknown]
);

// deno-lint-ignore no-explicit-any
function validPair(left: any, right: any): 0 | 1 | 2 { // 0 = equal, 1 = valid, 2 = invalid
    if (Array.isArray(left) && !Array.isArray(right)) right = [right];
    if (!Array.isArray(left) && Array.isArray(right)) left = [left];
    for (let ri = 0; ri < right.length; ri++) {
        const lv = left[ri];
        const rv = right[ri];
        if (lv == null && rv != null) return 1;
        if (typeof lv === "number" && typeof rv === "number") {
            if (lv < rv) return 1;
            if (lv > rv) return 2;
        }
        if (Array.isArray(lv) || Array.isArray(rv)) {
            const sub = validPair(lv, rv);
            if (sub !== 0) return sub;
        }
    }
    if (left.length > right.length) return 2;
    return 0;
}

let ans = 0;
let j = 0;
for (const [left, right] of input) {
    const check = validPair(left, right);
    j++;
    if (check === 1) ans += j;
}

console.log(ans);
