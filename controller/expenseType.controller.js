const ExpenseType = require('../model/expensetype.model');



const addDefaultExpenseTypes =async ()=> {
  try {
    // Check if any default types already exist
    const existingTypes = await ExpenseType.find();
    if (existingTypes.length === 0) {
      // Insert default types
      await ExpenseType.insertMany([
        { name: 'Rent' },
        { name: 'Hotel' },
        { name: 'Fuel' },
        { name: 'Restaurant' },
        { name: 'Taxi' },
        { name: 'Others' }
      ]);
      console.log('Default expense types added successfully.');
    } else {
      console.log('Default expense types already exist.');
    }
  } catch (error) {
    console.error('Error adding default expense types:', error);
  }
}

const getTypes = async (req ,res )=>  {
try{
const types = await ExpenseType.find() ; 
res.status(200).send(types); 
}catch(err){
res.status(500).send(err)
}
   

}

module.exports = {
  addDefaultExpenseTypes,
  getTypes 
};
