var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/data.db');

//CRUD function
let insertContacts = (json) => {
//  console.log(db);
  let insertContacts = `INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${json.name}', '${json.company}', '${json.telp_number}', '${json.email}');`;
  
  db.run(insertContacts);
};

let insertGroups = (json) => {
//  console.log(db);
  let insertGroups = `INSERT INTO Groups (name_of_group) VALUES ('${json.name_of_group}');`;
  
  db.run(insertGroups);
};

let editContacts = (json) => {
  let editContacts = `UPDATE Contacts SET name = '${json.name}', company = '${json.company}', telp_number = '${json.telp_number}', email = '${json.email}' WHERE id = '${json.id}';`;
    
  db.run(editContacts);
};

let editGroups = (json) => {
  let editGroups = `UPDATE Groups SET name_of_group = '${json.name_of_group}';`;
    
  db.run(editGroups);
};

let removeContacts = (id) => {
    let removeContacts = `DELETE FROM Contacts WHERE id = '${id}';`;
    
    db.run(removeContacts);
};

let removeGroups = (id) => {
    let removeGroups = `DELETE FROM Groups WHERE id = '${id}';`;
    
    db.run(removeGroups);
};

 module.exports = {
     insertContacts,
     insertGroups,
     editContacts,
     editGroups,
     removeContacts,
     removeGroups
 };

//insertData();