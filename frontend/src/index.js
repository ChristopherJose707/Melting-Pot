import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";


// TESTING START
import {fetchUser, fetchUsers} from './actions/user_actions';
import {fetchPhotos, fetchPhoto, deletePhoto} from './actions/photo_actions';
import { getRecipes, createRecipe, deleteRecipe, getRecipeUsingCategory } from './actions/recipe_actions';
import { createComment } from './actions/comment_actions';
import { getAllLikes, createLike } from "./actions/like_actions";

// TESTING END


document.addEventListener("DOMContentLoaded", () => {
  let store;

  
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, currentUser: decodedUser },
    };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    store = configureStore({});
  }

  // TESTING START
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchUser = fetchUser;
  window.fetchUsers = fetchUsers;

  window.fetchPhotos = fetchPhotos;
  window.fetchPhoto = fetchPhoto;
  window.deletePhoto = deletePhoto;
  window.getRecipes = getRecipes;
  window.createRecipe = createRecipe;
  window.deleteRecipe = deleteRecipe;
  window.getRecipeUsingCategory = getRecipeUsingCategory;

  window.createComment = createComment;

  window.getAllLikes = getAllLikes;
  window.createLike = createLike;
  // TESTING END

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
