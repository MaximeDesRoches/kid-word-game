
var myArgs = process.argv.slice(2);
var old_domain = myArgs[0];
var new_domain = myArgs[1];
var dump_path = myArgs[2];
// console.log('old_domain: ', old_domain);
// console.log('new_domain: ', new_domain);
// console.log('dump_path: ', dump_path);

const fs = require("fs");
var dump_data = fs.readFileSync(dump_path).toString();
var Peach = require("./peach.js");

var migration = Peach.migrate(dump_data, old_domain, new_domain);
// console.log('Number of serializations: ', migration.serialized_count);
// console.log('Number of replacements: ', migration.replaced_count);
// console.log('Difference in characters: ', migration.char_diff);

fs.writeFile(dump_path, migration.processed_file(), function(err) {
    if (err) {
        return console.log(err);
    }
    // console.log("The file was saved!");
});
