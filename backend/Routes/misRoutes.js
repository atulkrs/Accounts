const express = require("express");
const multer = require("multer");
const {
  uploadMIS,
  getAllUploadedFiles,
  saveMis,
} = require("../Controller/misController");
const authenticate = require("../Middlewares/authMiddleware");

const storage = multer.memoryStorage();
const router = express.Router();
const upload = multer({ storage });

router.post("/upload-mis", authenticate, upload.single("file"), uploadMIS);
router.get("/all-upload-mis", getAllUploadedFiles);
router.post("/save-mis", saveMis);
module.exports = router;
