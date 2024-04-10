const express = require("express");
//require("./config/db");
require("dotenv").config();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());



//import route




// config route 


app.listen(3000, () => {
  console.log("server work !! ");
});
