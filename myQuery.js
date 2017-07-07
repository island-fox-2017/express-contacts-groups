const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/data.db');

function insertData(objSomething) {
  db.run(`
    INSERT INTO Contacts (name, company, telp_number, email)
    VALUES ('${objSomething.name}', '${objSomething.company}', '${objSomething.telp_number}', '${objSomething.email}');
    `);
}

function showData() {
  db.all(`
    SELECT * FROM Contacts;
    `, function(err, rows) {
      if(!err) {
        return rows;
      }
    });
}

function deleteData(id) {
  db.run(`
    DELETE FROM Contacts WHERE id = ${id};
    `);
}

function editData(obj) {
  db.run(`
    UPDATE Contacts
    SET name = '${obj.name}', company = '${obj.company}', telp_number = '${obj.telp_number}', email = '${obj.email}'
    WHERE id = ${obj.id};
    `);
}


// Groups

function insertData2(objSomething) {
  db.run(`
    INSERT INTO Groups (name_of_group)
    VALUES ('${objSomething.name_of_group}');
    `);
}

function showData2() {
  db.all(`
    SELECT * FROM Groups;
    `, function(err, rows) {
      if(!err) {
        return rows;
      }
    });
}

function deleteData2(id) {
  db.run(`
    DELETE FROM Groups WHERE id = ${id};
    `);
}

function editData2(obj) {
  db.run(`
    UPDATE Groups
    SET name_of_group = '${obj.name_of_group}'
    WHERE id = ${obj.id};
    `);
}

module.exports = {
  insertData,
  showData,
  deleteData,
  editData,
  insertData2,
  showData2,
  deleteData2,
  editData2
}
