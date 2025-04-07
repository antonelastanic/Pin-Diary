const router = require("express").Router();
const multer = require("multer");
const Pin = require("../models/Pin");
const path = require("path");
const verifyToken = require("../middleware/verifyToken");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + path.extname(file.originalname);
      cb(null, uniqueName);
    },
});
  
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|webp/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
  
      if (extName && mimeType) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed!"));
      }
    }
});


//creating a pin, new logic because of multer

router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const newPin = new Pin({
      username: req.user.username, // From token
      title: req.body.title,
      desc: req.body.desc,
      rating: req.body.rating,
      lat: req.body.lat,
      long: req.body.long,
      imgURL: req.file.filename,
    });

    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
      // Handle file size error
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Image too large. Max size is 5MB." });
      } else if (err.message === "Only image files are allowed!") {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json(err);
    }
});

// show all pins

router.get("/", async (req, res) => {
    try{
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;