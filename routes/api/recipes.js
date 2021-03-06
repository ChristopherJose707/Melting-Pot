const express = require("express");
const router = express.Router();
const Recipe = require('../../models/Recipe');
const validateRecipeInput = require('../../validation/recipes')
const mongoose = require("mongoose");

//RETRIEVE ALL RECIPES
router.get('/', (req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ recipesNotFound: 'No recipes found' }))
})

// CREATE NEW RECIPE
router.post('/new', (req, res) => {
  const { errors, isValid } = validateRecipeInput(req.body)
  const newRecipe = new Recipe({
    authorId: req.body.authorId,
    name: req.body.name,
    story: req.body.story,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    comments: req.body.comments,
    cookingTime: req.body.cookingTime,
    difficulty: req.body.difficulty,
    category: req.body.category,
    numLikes: req.body.numLikes,
    photoId: req.body.photoId,
    photoUrl: req.body.photoUrl
  })
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  newRecipe.save()
    .then(recipe => res.json(recipe))
});

//RETRIEVE ONE RECIPE BY ID
router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
  .then(recipe => res.json(recipe))
  .catch(err => res.status(404).json({ recipeNotFound: 'Recipe with that ID does not exist' }));
});

//RETRIEVE RECIPES OF ONE USER
router.get('/author/:authorId', (req, res) => {
  Recipe.find({ "authorId": req.params.authorId })
  .then(recipes => {res.json(recipes)})
  .catch(err => res.status(404).json({ userRecipesNotFound: 'This user does not have any recipes' }));
})

// SEARCH RECIPES BY EACH CATEGORY
router.get('/category/:categoryName', (req, res) => {
  Recipe.find({ "category": req.params.categoryName })
  .then(recipes => {res.json(recipes)})
  .catch(err => res.status(404).json({ categoryRecipesNotFound: 'There are no recipes in this category' }))
})

//DELETE RECIPE
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((recipe) => res.json('Recipe successfully deleted'))
    .catch(err => res.status(400).json('Recipe was not successfully deleted'))
})

//EDIT A RECIPE
router.patch('/edit/:id', (req, res) => {
  mongoose.set('useFindAndModify', false);
  const { errors, isValid } = validateRecipeInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((recipe) => res.json(recipe))
})

router.post("/search-recipes", (req, res) => {
  let recipePattern = new RegExp(req.body.query, "i");

  Recipe.find({ name: { $regex: recipePattern } })
    .then((recipe) => {
      res.json({ recipe });
    })
    .catch((err) => console.log(err));
});


module.exports = router;
//MAKE SURE TO HAVE REGULAR ROUTES ABOVE ROUTES WITH WILDCARDS OTHER WISE YOU GET THIS BUG: UnhandledPromiseRejectionWarning: CastError: Cast to ObjectId failed for value