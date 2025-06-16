const express = require("express");
const router = express.Router();

// route
router.use("/auth", require("./authRoute"));
router.use("/blogs", require("./blogRoute"));
router.use("/multimedias", require("./multimediaRoute"));
router.use("/publications", require("./publicationRoute"));
router.use("/trainings", require("./trainingRoute"));
router.use("/users", require("./userRoute"));

// owner
router.use("/owners", require("./owner_route"));
// router.use("/owner/links", require("./owner_route"));

// owner
router.use("/admin", require("./modelRoute"));


module.exports = router;
