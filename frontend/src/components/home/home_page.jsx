import React from 'react'
import CategoryNavBarContainer from '../category-nav/1.navbar_container'
import { Link } from 'react-router-dom';
import './home_page.css';

class HomePage extends React.Component {

  componentDidMount() {
    this.props.getRecipes();
    this.props.getEvents();
    this.props.fetchUsers();
  }
  
  handleRandomRecipe() {
    const randomNumber = Math.floor(Math.random() * (Object.values(this.props.recipes).length))
    const recipeIds = Object.keys(this.props.recipes);
    const randomId = recipeIds[randomNumber]
    return (this.props.recipes[randomId])
  } 
  
  handleRandomEvent() {
    const randomNumber = Math.floor(Math.random() * (Object.values(this.props.events).length))
    const eventIds = Object.keys(this.props.events);
    const randomId = eventIds[randomNumber]
    return (this.props.events[randomId])
  }

  fetchUserInfoForRecipe(recipeOwnerId) {
    return this.props.users[recipeOwnerId]
  }

  handleParticipateButton(eventId) {
    if (this.props.currentUser !== {}) {
      // if (this.props.users[this.props.currentUser._id].eventsParticipating.includes("ff16ef488117e1e9e7aa850")) {
      //   return ('Participating')
      // } else {
      return <button className='home-page-join-button'>Join</button>
      // }
    } else if (this.props.currentUser === {}) {
      return <button className="home-page-register-button">Register to Join</button>
    }
  }

  render() {
    
    const randomRecipe = this.handleRandomRecipe();
    if (randomRecipe === undefined) {
      return null
    }
    
    const randomEvent = this.handleRandomEvent();
    if (randomEvent === undefined) {
      return null
    }
    
    const fetchUserInfoForRecipe = this.fetchUserInfoForRecipe(randomRecipe.authorId);
    if (fetchUserInfoForRecipe === undefined) {
      return null
    }
    
    const handleParticipateButton = this.handleParticipateButton(randomEvent._id);
    if (handleParticipateButton === undefined) {
      return null
    }
    
    return (
      <div className='home-page-container'>
        {/* <CategoryNavBarContainer /> */}
        <div className='trending-recipes'>

          <div className='home-page-header'>
            <h1>Trending Recipes</h1>
            <Link to={`/recipes/${randomRecipe._id}`}>
              <button className='home-page-buttons'>View Full Recipe</button>
            </Link>
          </div>
          <h1>{randomRecipe.name}</h1>
          <img src={randomRecipe.photoUrl} className='home-page-images'></img>
          <div className='home-page-recipe-author'>
            <img src={fetchUserInfoForRecipe.photoUrl} className='home-page-author-image'></img>
            <h1>{fetchUserInfoForRecipe.handle}</h1>
          </div>
        </div>

        <div className='trending-events'>
          <div className='home-page-header'>
            <h1>Trending Event</h1>
            <Link to={`/events/${randomEvent._id}`}>
              <button className='home-page-buttons'>View Full Event</button>
            </Link>
          </div>

          <div className='home-page-event-details-box'>
            <img src={randomEvent.photoUrl} className="home-page-images"></img>
            <div className='home-page-event-details'>
              <h1>{randomEvent.name}</h1>
              <h1>Date: {randomEvent.date}</h1>
              <h1>Start Time: {randomEvent.startTime}</h1>
              <h1>End Time: {randomEvent.endTime}</h1>
              <h1># of Participants: {randomEvent.usersJoined.length}</h1>
              <h1>Location: {randomEvent.location}</h1>
              <h1>Description: {randomEvent.description}</h1>
            </div>
            <div>{handleParticipateButton}</div>
          </div>
        </div>

      </div>
    );
  }
}

export default HomePage;