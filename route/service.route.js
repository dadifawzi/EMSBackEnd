
// routes/serviceRoutes.js

const express = require('express');
const router = express.Router();
const serviceController = require('../controller/service.controller');




// Existing routes...

router.post('/', serviceController.createService);
router.get('/',  serviceController.getAllServices);




// New routes for CRUD operations

router.get('/:id',        serviceController.getServiceById);
router.put('/:id',serviceController.updateServiceById);
router.delete('/:id',  serviceController.deleteServiceById);






module.exports = router;
