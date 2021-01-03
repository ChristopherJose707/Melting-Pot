import { connect } from 'react-redux';
import { getRecipe, getRecipes } from '../../actions/recipe_actions';
import { getEvent, getEvents } from '../../actions/event_actions';
import { fetchUsers, fetchUser } from '../../actions/user_actions';
import HomePage from './home_page';
// import { withRouter } from 'react-router';

const mapStateToProps = (state) => {
  return ({
    currentUser: state.session.currentUser.user,
    recipes: state.entities.recipes,
    events: state.entities.events,
    users: state.entities.users
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getRecipes: () => dispatch(getRecipes()),
    getRecipe: (recipeId) => dispatch(getRecipe(recipeId)),
    getEvents: () => dispatch(getEvents()),
    getEvent: (eventId) => dispatch(getEvent(eventId)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: (userId) => dispatch(fetchUser(userId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);