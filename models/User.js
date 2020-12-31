const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: false
    },

    friends: [{type: Schema.Types.ObjectId, ref: 'users', required: false}],
    likedRecipes:[{type: Schema.Types.ObjectId, ref: 'recipes', required: false}],
    dietaryRestrictions: [{type: String, required: true}],
    recipesPosted: [{ type: Schema.Types.ObjectId, ref: 'users', required: false }],

}, {
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);
