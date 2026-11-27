import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async (req) => {
    if (req.method !== "POST") {
        return Response.json({ error: "Method not allowed" }, { status: 405 })
    }
    try {
        const { ingredients } = await req.json()
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            return Response.json({ error: "Please add some ingredients first." }, { status: 400 })
        }
        const msg = await anthropic.messages.create({
            model: "claude-haiku-5-5",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                { role: "user", content: `I have ${ingredients.join(", ")}. Please give me a recipe you'd recommend I make!` },
            ],
        })
        return Response.json({ recipe: msg.content[0].text })
    } catch (err) {
        console.error("Recipe generation failed:", err)
        return Response.json({ error: "Chef Nithin couldn't come up with a recipe right now. Please try again." }, { status: 500 })
    }
}
