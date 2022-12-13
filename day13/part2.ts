const input = Deno.readTextFileSync("input").trim().split("\n").filter(Boolean).map((l) => eval(l));
input.push([[2]]);
input.push([[6]]);

// deno-lint-ignore no-explicit-any
function validPair(left: any, right: any): 0 | 1 | -1 { // 0 = equal, 1 = valid, -1 = invalid
    if (Array.isArray(left) && !Array.isArray(right)) right = [right];
    if (!Array.isArray(left) && Array.isArray(right)) left = [left];
    for (let ri = 0; ri < right.length; ri++) {
        const lv = left[ri];
        const rv = right[ri];
        if (lv == null && rv != null) return 1;
        if (typeof lv === "number" && typeof rv === "number") {
            if (lv < rv) return 1;
            if (lv > rv) return -1;
        }
        if (Array.isArray(lv) || Array.isArray(rv)) {
            const sub = validPair(lv, rv);
            if (sub != 0) return sub;
        }
    }
    if (left.length > right.length) return -1;
    return 0;
}

input.sort((l, r) => -validPair(l, r));

console.log(
    (input.findIndex((e) => JSON.stringify(e) === "[[2]]") + 1) *
        (input.findIndex((e) => JSON.stringify(e) === "[[6]]") + 1),
);
