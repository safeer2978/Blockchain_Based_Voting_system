module.exports = app => {
  const contracts = require("../controllers/contract.controller.js");

  // Create a new Customer
  app.post("/addcontract", contracts.create);

  // Retrieve all Customers
  app.get("/contracts", contracts.findAll);

  // Retrieve a single Customer with contractId
  app.post("/contracts", contracts.findOne);

  // Update a Customer with contractId
  //app.put("/contracts/:contractId", contracts.update);

  // Delete a Customer with contractId
  //app.delete("/contracts/:contractId", contracts.delete);

  // Create a new Customer
  app.delete("/removecontracts", contracts.deleteAll);
};
