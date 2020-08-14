const sql = require("./db.js");
var async = require('async');
// constructor
const Contract = function(contract) {
  //this.email = contract.email;
  //this.name = contract.name;
  //this.imga = contract.imga;
  //this.psymbol = contract.psymbol;
  //this.party = contract.party;
  this.district = contract.district;
  this.address = contract.address;
  //this.active = contract.active;
};

Contract.create = (newContract, result) => {
/*
async function asyncForEach(newContract, callback) {
  for (let index = 0; index < newContract.length; index++) {
      sql.query("INSERT INTO contracts SET ?",newContract[index], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created contract: ", { id: res.insertId, ...newContract[index]});
    result(null, {"message":"SUCCESS" });
  });
       await callback(newContract[index], index, newContract);
  }
}*/
function save_row_to_db (post, callback) {
    sql.query('INSERT INTO contracts SET ?', post, callback);
}

function finished(err) {
    if (err) throw err;
    result(null, {"message":"SUCCESS" });
}

async.eachLimit(newContract, newContract.length, save_row_to_db, finished);



};

Contract.findById = (district, result) => {
  sql.query(`SELECT * FROM contracts WHERE district = ${district}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found contract: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Contract with the id
    result({ kind: "not_found" }, null);
  });
};

Contract.getAll = result => {
  sql.query("SELECT * FROM contracts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("contracts: ", res);
    result(null, res);
  });
};

Contract.removeAll = result => {
  sql.query("DELETE FROM contracts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} contracts`);
    result(null, res);
  });
};

module.exports = Contract;
