import { id } from "./script.js"
import palettes from "./sorted.json" with { type: "json" }

let parent = id("palettes")
palettes["any"] = []
Object.entries(palettes).forEach(([key, value]) => {
    if (value.length >= 1 && key !== "any") {
        for (let i = 0; i < value.length; i++) {
            palettes["any"].push(value[i])
        }
    }
})

console.log(palettes["any"]);

