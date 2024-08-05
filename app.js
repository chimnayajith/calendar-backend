const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const app = express();
const ngrok = require("ngrok");

const port = process.env.PORT || 3000;
const eventRoutes = require("./routes/eventRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const otpRoutes = require("./routes/otpRoutes.js");
// Connecting to mongo database
require("./config/dbConnection.js");

app.use(cors());
app.use(bodyParser());

app.use("/events", eventRoutes);
app.use("/auth", authRoutes);
app.use("/otp", otpRoutes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    const url = await ngrok.connect(3000);
    console.log(`Ngrok tunnel is running at: ${url}`);
  } catch (error) {
    console.error("Ngrok connection error:", error);
  }
});
