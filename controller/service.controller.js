// controllers/serviceController.js

const Service = require('../model/service.model');




// Create a new service
exports.createService = async (req, res) => {
  try {
    console.log("request ",req.body);
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).send(newService);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
 try {
    // Fetch all services from the database
    let services = await Service.find({});

    // Transform each service: return all fields, but replace '_id' with 'id'
    services = services.map(service => ({
      ...service.toObject(), // Converts the document to a plain JavaScript object
      id: service._id,       // Add 'id' field with the value of '_id'
      _id: undefined         // Remove '_id' field
    }));

    res.status(200).send(services);
  } catch (error) {
    res.status(500).send(error);
  }
};




// Get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).send();
    }
    res.send(service);
  } catch (error) {
    res.status(500).send(error);
  }

};

// Update a service by ID
exports.updateServiceById = async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).send();
    }
    updates.forEach(update => service[update] = req.body[update]);
    await service.save();
    res.send(service);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a service by ID
exports.deleteServiceById = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).send();
    }
    res.send(service);
  } catch (error) {
    res.status(500).send(error);
  }
};
