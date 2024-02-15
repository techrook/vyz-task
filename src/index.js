require('dotenv').config();

//external modules
const express = require("express");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

//internal modules
const userRouter = require("./routes/user.routes");
const paymentRouter = require("./routes/payment.routes")
// connect database
require("./DB/db").connect();

// middleware
app.use(express.json());

//endpoints
app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
