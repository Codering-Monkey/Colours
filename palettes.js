import { id } from "./script.js"
import palettes from "./sorted.json" with { type: "json" }

let parent = id("palettes")
palettes["any"] = []
Object.values(palettes).forEach((colours) => {
    for (let i = 0; i < colours.length; i++) {
        palettes["any"].push(colours[i])
    }
})

console.log(palettes["any"]);

