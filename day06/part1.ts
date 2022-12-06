const input = Deno.readTextFileSync("input").trim().split("");

for (let i = 0; i < input.length; i++) {
    const chars = [...new Set(input.slice(i, i + 4))];
    if (chars.length === 4) {
        console.log(i + 4);
        Deno.exit(0);
    }
}
