const input = Object.fromEntries(
    Deno.readTextFileSync("input").trim().split("\n").map((l) => {
        const [id, value] = l.trim().split(": ");
        if (isNaN(parseInt(value, 10))) {
            const [a, op, b] = value.split(" ");
            return [id, {
                operands: [a, b],
                operation: eval(`(a, b) => a ${op} b`),
            }];
        } else {
            return [id, {
                value: parseInt(value, 10),
            }];
        }
    }),
);

function check<N extends string>(node: N): N extends "root" ? [number, number] : number {
    const el = input[node];
    if (node === "root") return el.operands.map(check);
    if (el.value != null) return el.value;
    else return el.operation(...el.operands.map(check));
}

let a = 0;
let b = 1e14;

input["humn"].value = a;
const [ll, rl] = check("root");
input["humn"].value = b;
const [lh, rh] = check("root");

while (true) {
    const c = Math.floor((a + b) / 2);
    input["humn"].value = c;
    const [l, r] = check("root");
    if (l === r) {
        console.log(c);
        break;
    }
    if (rl === rh ? (ll > lh ? l < r : l > r) : (rl > rh ? l > r : l < r)) {
        b = c;
    } else {
        a = c;
    }
}
