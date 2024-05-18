const express = require("express");
require("./config/db");
require("dotenv").config();
const cors = require('cors');
const app = express();
const { createAdminAccount } = require("./controller/user.controller");
const {addDefaultExpenseTypes} = require('./controller/expenseType.controller') ; 


app.use(express.json());

app.use(cors());



//import route
const userRoute = require('./route/user.route') ; 
const clientRoute = require('./route/client.route'); 
const expenseRoute = require ('./route/expense.route') ; 
const serivceRoute = require('./route/service.route') ; 


// config route 

app.use("/user", userRoute);
app.use("/client", clientRoute);
app.use('/storage', express.static('./storage'));
app.use('/expense',expenseRoute);
app.use('/planing',serivceRoute);


app.listen(3000, () => {
  console.log("server work !! ");
 createAdminAccount();
 addDefaultExpenseTypes() ; 
});
