const express = require("express");
const router = express.Router();
const multimediaController = require("../controllers/multimediaController");

router.post("/", multimediaController.createMultimedia);
router.get("/", multimediaController.getAllMultimediaPosts);
router.get("/latest", multimediaController.getLatestMultimediaPost);
router.get("/:id", multimediaController.getMultimediaPostById);
router.get("/user", multimediaController.getMultimediaPostForUser);
router.put("/:id", multimediaController.updateMultimedia);
router.delete("/:id", multimediaController.deleteMultimedia);

module.exports = router;
