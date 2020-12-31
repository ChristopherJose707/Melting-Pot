import axios from 'axios';

export const getRecipes = () => {
    return axios.get(`/api/recipes`)
};

export const getUserRecipes = authorId => {
    return axios.get(`/api/recipes/${authorId}`)
}; 


export const getRecipe = recipeId => {
    return axios.get(`/api/recipes/${recipeId}`)
}; // this id refers to the recipes 

export const createRecipe = (recipe) => {
    return axios.post(`/api/recipes/new`, recipe)
};

export const updateRecipe = (recipe) => {
    return axios.patch(`/api/recipes/${recipe._id}`, recipe)
};

export const deleteRecipe = (recipeId) => {
    return axios.delete(`/api/recipes/${recipeId}`)
};