const input = Deno.readTextFileSync("input").trim().split("$ ").map((b) => b.trim()).map((b) => {
    const [fullCommand, ...output] = b.split("\n").map((l) => l.trim());
    const [command, ...args] = fullCommand.trim().split(" ");
    return { command, args, output };
});

type File = { type: "file"; name: string; size: number };
type Dir = { type: "dir"; name: string; contents: (Dir | File)[] };

const root: Dir = { type: "dir", name: "/", contents: [] };

const currentDir = [];

function getDir(dir: string[]): Dir {
    if (dir.join("/") === "/") return root;
    const partPath = dir.slice(1);
    let current = root;
    for (const part of partPath) {
        const temp = current.contents.find((i) => i.name === part && i.type === "dir") as Dir;
        current = temp;
    }
    return current;
}

for (const { command, args, output } of input) {
    switch (command) {
        case "cd": {
            if (args[0] === "..") {
                currentDir.pop();
            } else {
                currentDir.push(args[0]);
            }
            break;
        }
        case "ls": {
            const dir = getDir(currentDir);
            for (const line of output) {
                if (line.startsWith("dir")) {
                    const [, dirName] = line.split(" ");
                    dir.contents.push({ type: "dir", name: dirName, contents: [] });
                } else {
                    const [size, fileName] = line.split(" ");
                    dir.contents.push({ type: "file", name: fileName, size: parseInt(size) });
                }
            }
            break;
        }
    }
}

function getAllDirs(path: string[]) {
    const dir = getDir(path);
    const dirs = [dir];
    for (const item of dir.contents) {
        if (item.type === "dir") {
            dirs.push(...getAllDirs([...path, item.name]));
        }
    }
    return dirs;
}

function getDirSize(dir: Dir) {
    let size = 0;
    for (const item of dir.contents) {
        if (item.type === "dir") {
            size += getDirSize(item);
        } else {
            size += item.size;
        }
    }
    return size;
}

console.log(getAllDirs(["/"]).map((d) => getDirSize(d)).filter((s) => s <= 100000).reduce((a, c) => a + c, 0));
