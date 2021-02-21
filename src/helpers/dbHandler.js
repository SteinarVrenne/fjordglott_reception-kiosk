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
var db = new JsonDB(new Config("./src/db/reception.db.json", true, false, "/"));

// let newGuest = {
//   fn: "Ole",
//   mn: "Gunnar",
//   ln: "Solskjær",
//   arrivalDate: "20-02-2021",
//   departureDate: "22-02-2021",
//   cellphone: "291003101",
// };

// db.push("/guests/20-02-2021", newGuest);

ipcMain.on("pushToDatabase", (event, arg) => {
  //   console.log(arg) // prints "ping"
  //   event.reply('pushToDatabase', 'pong')

  try {
    db.push(arg.dbPath, arg.dbData);
    console.log("PUSHED");
  } catch {
    event.reply("pushToDatabase", "FAILURE");
  }
});

console.log(db.getData("/guests"));
