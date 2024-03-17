const express = require("express");

const multer  = require('multer');
const path = require('path');


// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads') // save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // keep the original filename
    }
});

// Create multer instance with custom storage
const upload = multer({ storage: storage });


const app = express();

const router = express.Router();

const videoControllers = require('../controllers/videos')

console.log("Im in home router")

router.get('/', videoControllers.postVideos);

router.get('/upload', videoControllers.uploadVideos);

router.post('/uploading',upload.single('videoFile'), videoControllers.uploadingVideos);

exports.routes = router;