const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");


require('dotenv').config();
const port = process.env.PORT || 4000;

const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}
    );

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection succesful!");
});

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

