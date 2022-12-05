const input = Deno.readTextFileSync("input");

const [rawCrates, rawMoves] = input.trimEnd().split("\n\n");

const crateRows = rawCrates.trimEnd().split("\n").slice(0, -1).map((l) =>
    l.match(/(.{4}|.{3})/g)!.map((c) => c.trim().length ? c.trim().slice(1, 2) : null)
);

const crates: string[][] = [[]];

for (let i = 0; i < crateRows[0].length; i++) {
    crates.push([]);
    for (let j = 0; j < crateRows.length; j++) {
        if (crateRows[j][i]) crates[i + 1].unshift(crateRows[j][i]!);
    }
}

const moves = rawMoves.trim().split("\n").map((l) => {
    const [amount, from, to] = l.match(/\d+/g)!;
    return { amount: parseInt(amount), from: parseInt(from), to: parseInt(to) };
});

for (const move of moves) {
    const cratesToMove = crates[move.from].splice(-move.amount, move.amount);
    crates[move.to].push(...cratesToMove.reverse());
}

console.log(crates.map((s) => s.at(-1)).join(""));
