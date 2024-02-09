const express = require('express');
const bodyParser = express.json;
const cors = require('cors'); 
const app = express();

const port = process.env.PORT || 3000;
const eventRoutes = require("./routes/eventRoutes.js")
const authRoutes = require("./routes/authRoutes.js")

// Connecting to mongo database
require("./config/dbConnection.js")



app.use(cors());
app.use(bodyParser());

app.use('/events' , eventRoutes);
app.use('/auth' , authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
