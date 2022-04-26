//no need to assign, just require it and its done
require("./src/models/User");
require("./src/models/Track");
require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("./src/middlewares/requireAuth");
const authRoutes = require("./src/routes/authRoutes");
const trackRoutes = require("./src/routes/trackRoutes");
const app = express();

//in case you cant connect to server
//eg
//when change internet, need to whitelist ip on mongodb website
//look for newtwork access on the sidebar
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => console.log("connected to mongo"));
mongoose.connection.on("error", (err) => console.error("error connecting to mongo", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(trackRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, () => {
	console.log(`server is running on port ${process.env.PORT}`);
});
