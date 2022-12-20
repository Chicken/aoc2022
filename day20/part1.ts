const input = Deno.readTextFileSync("input").trim().split("\n").map(Number).map((v, i) => [v, i]);

for (let i = 0; i < input.length; i++) {
    const index = input.findIndex((e) => e[1] === i);
    const [[value, originalIndex]] = input.splice(index, 1);
    const newIndex = (index + value + input.length) % input.length;
    input.splice(newIndex === 0 ? input.length : newIndex, 0, [value, originalIndex]);
}

const indexZero = input.findIndex((e) => e[0] === 0);
console.log(
    input[(indexZero + 1000) % input.length][0] +
        input[(indexZero + 2000) % input.length][0] +
        input[(indexZero + 3000) % input.length][0],
);
