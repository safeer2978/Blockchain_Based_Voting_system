const sql = require("./db.js");

// constructor
const Voter = function(voter) {
  //this.email = Voter.email;
  this.hash = voter.hash;
  //this.imga = Voter.imga;
  //this.psymbol = Voter.psymbol;
  this.vote = voter.vote;
  this.district = voter.district;
  //this.active = Voter.active;
};

Voter.create = (newVoter, result) => {
  sql.query("INSERT INTO Voters SET ?", newVoter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Voter: ", { id: res.insertId, ...newVoter });
    result(null, { id: res.insertId, ...newVoter });
  });
};

Voter.findById = (hash, result) => {
  sql.query("SELECT * FROM Voters WHERE `hash` = ?",hash, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Voter: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Voter with the id
    result({ kind: "not_found" }, null);
  });
};


Voter.voteAuth = (hash, result) => {
  sql.query(
    "UPDATE Voters SET  vote = ? WHERE `hash` = ?",
    [1, hash],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Voter with the id
        result({ kind: "not_found" }, null);
        return;
      }
      sql.query("SELECT * FROM Voters WHERE `hash` = ?",hash, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Voter: ", res[0]);
      result(null, {"message":"SUCCESS"});
      return;
    }

    // not found Voter with the id
    result({ kind: "not_found" }, null);
  });
      //console.log("updated Voter: ", { id: id, ...Voter });
     // result(null, );
    }
  );
};


Voter.removeAll = result => {
  sql.query("DELETE FROM Voters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Voters`);
    result(null, res);
  });
};

module.exports = Voter;
