
// Open a SQLite database, stored in the file db.sqlite
const db = new Database("./config/usersDB.sqlite");

// Fetch a random integer between -99 and +99
db.all("SELECT * FROM USERS", (_, rows) => {
  console.log(rows);
});
