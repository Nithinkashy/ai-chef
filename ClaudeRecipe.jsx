import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'

export default function ClaudeRecipe(props){
    return(
        <section className='suggested-recipe-container'>
            <h1>Chef Nithin Recommends:</h1>
            <ReactMarkdown>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}