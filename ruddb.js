// const { ipcRenderer } = require('electron');

// ipcRenderer.send('app-loaded');

// ipcRenderer.on('app-loaded', (event, arg) => {
//     console.log(response)
// })


const sqlite3 = require('sqlite3').verbose();

let connectdb =new sqlite3.Database('BillingRecords.db',(err)=>{
    if(err){
        console.log("database connected",err);
    }                           
    else{
        console.log("Database connected successfully.");
    }
});

//Execute a select statement to receive from the database
connectdb.all(`SELECT * FROM restaturantproducts`,[],(err,rows) =>{
    if(err){
        console.log("data not getting from database");
    }
    //Get the container element where the product list will be displayed 

    let container = document.getElementById('search_container');

    //create HTML select element
    let select = document.createElement("select");
    select.id ="product-select";

    //iterate over the result and generate the html option for each product
    for (let i = 0; i < rows.length; i++){
      let product = rows[i];
     
      //Generate the HTML option element for the product
       let option =document.createElement("option");
        option.value =product.id;
        option.innerText = product.id + " " + product.Item_name;
       
       // add the option to the select element
       select.appendChild(option);
    }
  
    //add the select element to the container
    container.appendChild(select);
    
});

