const input = Deno.readTextFileSync("input").trim().split("\n\n").map((m) => {
    const lines = m.trim().split("\n").map((l) => l.trim());
    const id = parseInt(lines[0].match(/\d+/)![0]);
    const items = lines[1].match(/\d+/g)!.map(BigInt);
    const [operator, _operand] = lines[2].match(/(\*|\+) (old|\d+)/)!.slice(1);
    const operand = _operand === "old" ? "old" : BigInt(parseInt(_operand)) as "old" | bigint;
    const test = BigInt(parseInt(lines[3].match(/\d+/)![0]));
    const ifTrue = parseInt(lines[4].match(/\d+/)![0]);
    const ifFalse = parseInt(lines[5].match(/\d+/)![0]);
    return { id, items, operator, operand, test, ifTrue, ifFalse, inspects: 0 };
});

const divisor = input.map((m) => m.test).reduce((a, c) => a * c, 1n);

for (let i = 0; i < 10000; i++) {
    for (const monkey of input) {
        for (const item of monkey.items) {
            monkey.inspects++;
            const worry = monkey.operator === "*"
                ? (item * (monkey.operand === "old" ? item : monkey.operand)) % divisor
                : (item + (monkey.operand === "old" ? item : monkey.operand)) % divisor;

            if (worry % monkey.test === 0n) {
                const receiver = input.find((m) => m.id === monkey.ifTrue)!;
                receiver.items.push(worry);
            } else {
                const receiver = input.find((m) => m.id === monkey.ifFalse)!;
                receiver.items.push(worry);
            }
        }
        monkey.items = [];
    }
}

const [one, two] = input.sort((a, b) => b.inspects - a.inspects);
console.log(one.inspects * two.inspects);
