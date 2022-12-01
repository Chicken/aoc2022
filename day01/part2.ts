console.log(
    Deno.readTextFileSync("input").trim().split("\n\n").map((e) =>
        e.trim().split("\n").map((s) => s.trim()).map(Number)
    ).map((e) => e.reduce((a, c) => a + c, 0)).sort((a, b) => b - a).slice(0, 3).reduce((a, c) => a + c, 0),
);
