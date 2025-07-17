import React from "react"
import ClaudeRecipe from "./ClaudeRecipe.JSX";
import IngredientsList from "./IngredientsList";
import { getRecipeFromChefClaude } from "./ai";

export default function Main(){
    const [ingredients,setIngredients] = React.useState([])
    const[recipe,setRecipe]=React.useState("")
    const recipeSection = React.useRef(null)
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
             recipeSection.current.scrollIntoView({behavior: "smooth"})
            // const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
            // window.scroll({
            //     top: yCoord,
            //     behavior: "smooth"
            // })
        }
    }, [recipe])


    function addIngredients(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredient => (
            [...prevIngredient,newIngredient]
        ))
    }
   
    async function getRecipe(){
       const recipeIdea = await getRecipeFromChefClaude(ingredients)
       setRecipe(recipeIdea)
    }

    return(
        <main>
            <form action={addIngredients} className="add-ingredient">
                <input type="text" placeholder="e.g. Jalapenos" aria-label="Add Ingredients" name="ingredient"/>
                <button>Add Ingredients</button>
            </form>
            {ingredients.length >0 ?
                <IngredientsList ref={recipeSection} ingredients={ingredients} getRecipe={getRecipe}/>
            :null}
            {recipe? 
                <ClaudeRecipe recipe = {recipe}/>
            :null}
        </main>

    )
}