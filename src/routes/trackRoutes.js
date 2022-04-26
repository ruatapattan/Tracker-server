const express = require("express");
const mongoose = require("mongoose");

const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

//router will execute reqauth before doing other middlewares

router.get("/tracks", requireAuth, async (req, res, next) => {
	const tracks = await Track.find({
		userId: req.user.id,
	});
	
	res.send(tracks);
});

router.post("/tracks", requireAuth, async (req, res, next) => {
	const { name, locations } = req.body;

	if (!name || !locations) {
		return res.status(422).send({ error: "name and locations required" });
	}
	try {
		const track = new Track({ name, locations, userId: req.user.id });
		await track.save();
		res.send(track);
	} catch (err) {
		return res.status(422).send({ error: err.message });
	}
});

router.patch("/tracks/update-name/:id", requireAuth, async (req, res, next) => {
	try {
		const { name } = req.body
		const id = req.params.id

		const updatedTrack = await Track.updateOne(
			{
				_id: id,
				userId: req.user.id,
			},
			{
				$set: { name: name },
			}
		);
		res.send(updatedTrack)
	} catch (error) {
		console.log('err', error)
		return res.status(422).send({ error: error.message });
	}
})

router.delete("/tracks/:id", requireAuth, async (req,res, next) => {
	try {
		const id = req.params.id
		const deletedTrack = await Track.deleteOne({
			_id: id,
			userId: req.user.id
		})
		res.send(deletedTrack)
	} catch (error) {
		return res.status(422).send({ error: err.message });
	}
})

module.exports = router;
