const input = Deno.readTextFileSync("input").trim().split("\n").map((l) =>
    l.split(" ").map((e, i) => i ? parseInt(e) : e) as [string, number]
);

let X = 1;
let cycle = 1;

const te = new TextEncoder();
const enc = te.encode.bind(te);
const draw = () => Deno.stdout.writeSync(enc(Math.abs(X - ((cycle - 1) % 40)) <= 1 ? "#" : " "));
const newline = () => cycle % 40 == 0 ? Deno.stdout.writeSync(enc("\n")) : null;
const crt = () => draw() && newline();

for (const [inst, cnt] of input) {
    if (inst === "noop") {
        crt();
        cycle++;
        continue;
    }
    if (inst === "addx") {
        crt();
        cycle++;

        crt();
        X += cnt;
        cycle++;
    }
}
