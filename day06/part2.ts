const input = Deno.readTextFileSync("input").trim().split("");

for (let i = 0; i < input.length; i++) {
    const chars = [...new Set(input.slice(i, i + 14))];
    if (chars.length === 14) {
        console.log(i + 14);
        Deno.exit(0);
    }
}
