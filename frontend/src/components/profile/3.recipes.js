import React from 'react'

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            recipesPosted: []
        }
    }

    componentDidMount(){
        this.props.getUserRecipes(this.props.currentUser._id)
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Recipes;