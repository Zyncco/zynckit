const fs = require("fs");
const path = require("path");

module.exports = (rootPath, type) => {
    const name = process.argv[2];

    if (!name || name === "") error(`Please enter a ${component} name`);

    // If the file already exists, don't overwrite it
    if (fs.existsSync(path.join(rootPath, `_${name}.scss`))) 
        error("File for that component already exists!");

    // Create file
    fs.writeFileSync(path.join(rootPath, `_${name}.scss`), "");

    // Add import to _all.scss
    const importString = `@import "${name}";`;
    let lines = fs.readFileSync(path.join(rootPath, `_all.scss`)).toString().split("\n");

    // Ignore first line of the array (its a comment)
    lines = lines.slice(1);

    // Remove any blank lines
    lines = lines.filter((a) => a !== "");

    console.log(lines);

    // If for whatever reason that component is already in the file, just exit
    if (lines.includes(importString)) process.exit(0);

    // Add the new import into the array and sort it after
    lines.push(importString);
    lines.sort();

    // Write to _all.scss
    const data = `// Don't modify this file directly! Use yarn run create:${type}.\n\n${lines.join("\n")}\n`;
    fs.writeFileSync(path.join(rootPath, `_all.scss`), data);

    function error(err) {
        console.error(err);
        process.exit(1);
    }
}