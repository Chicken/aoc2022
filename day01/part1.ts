console.log(
    Math.max(
        ...Deno.readTextFileSync("input").trim().split("\n\n").map((e) =>
            e.trim().split("\n").map((s) => s.trim()).map(Number)
        ).map((e) => e.reduce((a, c) => a + c, 0)),
    ),
);
