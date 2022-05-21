// import { JsonDB } from "node-json-db";
// import { Config } from "node-json-db/dist/lib/JsonDBConfig";

const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

// Import IPCMain so we can push received data to DB
const { ipcMain } = require("electron");

// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
var db = new JsonDB(new Config("./src/db/reception.db.json", true, true, "/"));

ipcMain.on("pushToDatabase", (event, arg) => {
  //   console.log(arg) // prints "ping"
  //   event.reply('pushToDatabase', 'pong')

  try {
    // Find amount and use it as auto increment
    // Keep a meta reference for amount of guests pushed in meta tag

    db.push(arg.dbPath, arg.dbData, false);
    console.log("PUSHED");

    event.reply("pushToDatabase", db.getData("/guests"));
  } catch {
    event.reply("pushToDatabase", "FAILURE");
  }
});

// db.push("/tests/testArray[]", "TEST1");

console.log(db.getData("/"));
// console.log(db.count("/tests/testArray"));

// Initialize
function initialize() {
  console.log("WILL CREATE META TAGS");

  db.push("/meta/guests/amount", 0);
}

// Check for missing data
try {
  db.getData("/meta");
} catch {
  initialize();
}
