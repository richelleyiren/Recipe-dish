const mongoose = require('mongoose')
const schema = mongoose.Schema

const recModel = new schema({
    recName : String,
    writer:String,
    origin: String,
    category: String,
    ingredients: String,
    recipe: String,
    image: String
})

const recModule = mongoose.model(" Recipes",recModel)

module.exports = recModule