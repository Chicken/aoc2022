const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim());

let ans = 0;

for (const number of input) {
    let sum = 0;
    for (const [i, fakeDigit] of Object.entries(number.split("").reverse())) {
        const place = parseInt(i, 10);
        const digit = { "-": -1, "=": -2 }[fakeDigit] ?? parseInt(fakeDigit, 10);
        sum += digit * (5 ** place);
    }
    ans += sum;
}

let ansString = "";

while (ans > 0) {
    ansString += "=-012"[(ans + 2) % 5];
    ans = Math.round(ans / 5);
}

console.log(ansString.split("").reverse().join(""));
