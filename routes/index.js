const express = require("express");
const router = express.Router();

// route
router.use("/auth", require("./authRoute"));
router.use("/users", require("./userRoute"));
router.use("/", require("./modelRoute"));


module.exports = router;
