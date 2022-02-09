const express = require('express')
const router = express.Router()
const recCon = require('../controllers/recipeController')
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
});

router.post("/recipe", upload.single("image"), recCon.addRecipe)
router.get('/about', recCon.displayRecipe)
router.get("/about/:id", recCon.getRecipes);
  
module.exports = router