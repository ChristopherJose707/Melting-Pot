import React from 'react'

class Recipes extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(this.props.recipes)
        this.props.getUserRecipes(this.props.currentUser._id)
    }

    // e(){
    //     let recs = this.state.recipesPosted
    //     let array = this.props.recipes
    //     if (array > 0) {
    //         for (let i = 0; i < array.length; i++) {
    //             array.map((recipe) => {
    //                 recs.push(recipe)
    //             })
    //         }
    //         this.setState({recipesPosted : recs})
    //     } else {
    //         this.setState({recipesPosted: recs})
    //     }
    // }

    render() {
        if (!this.props.recipes) {
            return null
        }
        return (
            <div>
                <ul>
                    {Object.values(this.props.recipes).map((recipe, i) => (
                        <li key={i}>
                        
                            {recipe.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Recipes;