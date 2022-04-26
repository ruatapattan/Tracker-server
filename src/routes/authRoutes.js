const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");



const router = express.Router();


router.post("/signup", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = new User({ email, password });
		await user.save();

		const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

		res.send({ token });
	} catch (err) {
		console.log(err);
		return res.status(422).send(err.message);
	}
});

router.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).send({ error: "email and password required" });
	}

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).send({ error: "email not found" });
	}
	try {
		await user.comparePassword(password);
		const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
		return res.send({ token });
	} catch (err) {
		console.log(err);
		return res.status(422).send({ error: "invalid password or email" });
	}
});

module.exports = router;
