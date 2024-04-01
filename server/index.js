const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const { register } = require("./controllers/auth.js");
const authRoute = require("./routes/auth.js");
const cors = require('cors');
const bodyparser = require("body-parser");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post("/auth/register", register);

app.use("/auth", authRoute);
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
