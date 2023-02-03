
const sqlite3 = require('sqlite3').verbose();


//Connect to the database: In your code, create a new SQLite database
//or connect to an existing one by creating a new sqlite3.Database object:

const db =new sqlite3.Database('BillingRecords.db',(err) => {
 
if(err) {
    console.error(err.message);
}
console.log('connected to the SQlite database');
})

//Execute SQL statements: 
//To execute SQL statements, you can use the run() method of the sqlite3.Database object:
db.run(`CREATE TABLE IF NOT EXISTS billing(
id INTEGER PRIMARY KEY AUTOINCREMENT,
Iteam_name TEXT NOT NULL,
Description TEXT NOT NULL,
Quantity TEXT NOT NULL,
Rate TEXT NOT NULL,
Amount TEXT NOT NULL
)`, (err) => {
    if(err)
    {
        console.log("syntax error ",err);
    }
    console.log(`Customer table created is successfully.`)

});
//Retrieve data: To retrieve data from the database, you can use the all() method of the sqlite3.Database object:

