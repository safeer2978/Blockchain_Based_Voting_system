module.exports = app => {
  const voters = require("../controllers/voter.controller.js");

  // Create a new Customer
  app.post("/voters", voters.create);

  // Retrieve all Customers
  //app.get("/voters", voters.findAll);

  // Retrieve a single Customer with voterId
  app.post("/getvoters", voters.findOne);

  // Update a Customer with voterId
  app.post("/voteauth", voters.voteauth);

  // Delete a Customer with voterId
  //app.delete("/voters/:voterId", voters.delete);

  // Create a new Customer
  app.delete("/voters", voters.deleteAll);
};
