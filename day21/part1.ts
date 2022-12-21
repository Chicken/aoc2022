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

function evaluate(node: string): number {
    const el = input[node];
    if (el.value != null) return el.value;
    else return el.operation(...el.operands.map(evaluate));
}

console.log(evaluate("root"));
