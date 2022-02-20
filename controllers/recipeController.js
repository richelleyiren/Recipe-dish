const recMod = require("../models/recipeModel");
const bycrypt = require('bcrypt')


const addRecipe = (req, res) => {
  console.log(req.file);
  const { recName, writer,origin, category, ingredients, recipe } = req.body;

  const show = {
    recName,
    writer,
    origin,
    category,
    ingredients,
    recipe,
    image: req.file.originalname,
  };

  const newRecipe = new recMod(show);
  newRecipe
    .save()
    .then((results) => {
      if (results) {
        res.redirect("/about");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayRecipe = (req, res) => {
  recMod.find().then((results) => {
    if (results) {
      const reversed = results.reverse();
      res.render("about", { blogs: reversed });
    }
  });
};

const getRecipes = (req, res) => {
  recMod.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.render("display", { title: "Recipe Details", blog: result });
      }
    })
    .catch((err) => console.log(err));
};

module.exports = {
  addRecipe,
  displayRecipe,
  getRecipes
};
