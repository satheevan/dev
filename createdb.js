
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')

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
db.run(`CREATE TABLE IF NOT EXISTS biller(
id INTEGER PRIMARY KEY AUTOINCREMENT,
Item_name TEXT NOT NULL,
Description TEXT NOT NULL,
Quantity TEXT NOT NULL,
Rate TEXT NOT NULL,
Amount TEXT NOT NULL
)`, (err) => {
    if(err)
    {
        console.log("syntax error ",err);
    }
    else{
    console.log(`biller table created is successfully.`)
    }
});

// ----------------------------------------------------------------------------------------------------------
//Second table create and insert by Json file:

db.serialize(()=>{/*serialize method for : Executing mutiple Opertion as a single transaction */
    db.run(`CREATE TABLE IF NOT EXISTS restaturantproducts
     (id INTEGER PRIMARY KEY AUTOINCREMENT,Item_name TEXT,Description TEXT,Status BOOLEAN,Rate INTEGER)`,(err)=>{
        if (err){
            console.log("restaturantproducts table not created", err);
        }
        else{
            console.log("restaturantproducts table created successfully");//why the result show finnaly @d
        }
     })
    let jsonpath = "./Nature of business/json/restaturantproducts.json";
    fs.readFile(jsonpath,(err,data)=>{
        if(err) throw console.log("reading err", err)
        const resproductData = JSON.parse(data)
        
    //data verification    
        if (resproductData.length != resproductData.length){
            const insertStmt = db.prepare('INSERT INTO restaturantproducts (Item_name, Description, Status, Rate) VALUES(?, ?, ?, ?)')
            resproductData.forEach(row => {
              let {Item_name, Description, Status, rate} = row
              insertStmt.run(Item_name, Description, Status, rate)
              //db.run(`INSERT INTO restaturantproducts (Item_name, Description, Status, Rate) VALUES('${Item_name}','${Description}','${Status}','${rate}')`)           
            //   console.log("data written to the database successfully")
            
            })
            insertStmt.finalize()
        }
        else{
            console.log("data already there")
        }
        console.log("data written to the database successfully")
    })
})
//Retrieve data: To retrieve data from the database, you can use the all() method of the sqlite3.Database object:

db.all(`SELECT * FROM restaturantproducts`,(err,rows) =>{
    if(err){
        console.log("syntax error", err)
    }
    else {
        console.log(rows);
    }
})


//Close the connection: To close the connection to the database, you can use the close() method of the sqlite3.Database object:
// db.close((err) =>{
//    if (err) {
//     console.log("db not closed properly",err);
//    }
//    else{
//     console.log('closed success')
//    }
// })

// ----------------------------------------------------------------------------------------------------------
// // second table 
// db.run(`CREATE TABLE IF NOT EXISTS restaturantproducts(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     Item_name TEXT NOT NULL,
//     Description TEXT NOT NULL,
//     Status INTEGER NOT NULL,
//     Rate TEXT NOT NULL
// )`,(err) =>{
//        if (err){
//         console.log("syntax error",err);
//        }
//     else{
//         console.log("restaturantdata table created successfully")
//     }
// });
// ----------------------------------------------------------------------------------------------------------
//Execute sql statement to create tables, insert data,update data and query data
// ----------------------------------------------------------------------------------------------------------
// db.serialize(() =>{
//    //iNSERT DATA
//    const stmt =db.prepare(`INTSERT INTO restaturantproducts (id,Item_name,Description,Status,Rate) VALUES(?,?,?,?,?)`);
//    stmt.run(1,'tea','normal',1,10);
//    stmt.run(2,'tea','jaggery',1,10);
//    stmt.run(3,'lemontea','normal',1,10);
//    stmt.run(4,'greentea','normal',1,20);
//    stmt.run(5,'blacktea','normal',1,10);
//    stmt.run(6,'coffee','normal',1,15);
//    stmt.run(7,'black coffee','normal',1,15);
//    stmt.run(8,'ragimalt','normal',1,15);
//    stmt.run(9,'sukucoffee','normal',1,15);
//    stmt.run(10,'tomato rice','normal',1,35);
//    stmt.run(11,'sambar rice','normal',1,35);
//    stmt.run(12,'vegetable rice','normal',1,35);
//    stmt.run(13,'curd rice','normal',1,35);
//    stmt.run(14,'vada','normal',1,10);
//    stmt.finalize();
// });
// ----------------------------------------------------------------------------------------------------------
// let values =[(1,'tea','normal',1,10),(6,'coffee','normal',1,15),(3,'lemontea','normal',1,10),(10,'tomato rice','normal',1,35),(11,'sambar rice','normal',1,35),(12,'vegetable rice','normal',1,35)];
// let placeholder = values.map((value)=> '(?,?,?,?,?)'.join(','));
// let sql = `INSERT INTO restaturantproducts (id,Item_name,Description,Status,Rate) VALUES` + placeholder;
// console.log(sql);
// db.run(sql, values, function(err){
//     if(err) {
//         return console.log("Intsert values syntax is error", err);
//     }
//     console.log(`rows inserted ${this.changes}`);
// });