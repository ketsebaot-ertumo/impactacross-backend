const express = require("express");
const router = express.Router();
const trainingController = require("../controllers/trainingController");

router.post("/", trainingController.createTraining);
router.get("/", trainingController.getAllTrainingPosts);
router.get("/latest/:id", trainingController.getLatestTrainingPost);
router.get("/:id", trainingController.getTrainingPostById);
router.get("/user/:id", trainingController.getTrainingPostById);
router.put("/:id", trainingController.updateTraining);
router.delete("/:id", trainingController.deleteTraining);

module.exports = router;
