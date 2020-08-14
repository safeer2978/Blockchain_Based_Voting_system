const sql = require("./db.js");

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
  sql.query("INSERT INTO contracts SET ?", newContract, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created contract: ", { id: res.insertId, ...newContract });
    result(null, { id: res.insertId, ...newContract });
  });
};

Contract.findById = (district, result) => {
  sql.query(`SELECT * FROM contracts WHERE id = ${district}`, (err, res) => {
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

Contract.updateById = (id, contract, result) => {
  sql.query(
    "UPDATE contracts SET email = ?, name = ?, active = ? WHERE id = ?",
    [contract.email, contract.name, contract.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Contract with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated contract: ", { id: id, ...contract });
      result(null, { id: id, ...contract });
    }
  );
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
