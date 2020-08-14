const Voter = require("../models/voter.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const voter = new Voter({
   // email: req.body.email,
    hash: req.body.hash,
    vote: 0,//req.body.vote,
    district: req.body.district
    //active: req.body.active
  });

  // Save Customer in the database
  Voter.create(voter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Voter.findById(req.body.hash, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Voter with hash ${req.body.hash}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Voter with id " + req.body.hash
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.voteauth = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Voter.voteAuth(
    req.body.hash,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.hash}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.hash
          });
        }
      } else res.send(data);
    }
  );
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Voter.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
