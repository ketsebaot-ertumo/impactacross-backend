const express = require("express");
const router = express.Router();
const trainingController = require("../controllers/trainingController");

router.post("/", trainingController.createTraining);
router.get("/", trainingController.getAllTrainingPosts);
router.get("/latest", trainingController.getLatestTrainingPost);
router.get("/:id", trainingController.getTrainingPostById);
router.get("/user", trainingController.getTrainingPostForUser);
router.put("/:id", trainingController.updateTraining);
router.delete("/:id", trainingController.deleteTraining);

module.exports = router;
