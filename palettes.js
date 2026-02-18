import { copy, id, capitalise, hover } from "./script.js"
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

export async function render_palettes() {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild)
    }
    let render_data = palettes[sessionStorage.get("colour")]
    for (let i = 0; i < render_data.length; i++) {
        let response = await fetch("./json/" + render_data[i] + ".json")
        let palette_data = await response.json();
        let container = document.createElement("div")
        container.className = "palette"

        let title = document.createElement("div")
        title.className = "title"
        title.style.backgroundImage = palette_data["--image"]
        title.style.backgroundSize = palette_data["--image-size"]
        container.appendChild(title)

        let titleText = document.createElement("h2")
        titleText.textContent = capitalise(render_data[i])
        hover(titleText, palette_data["--contrast"])
        titleText.addEventListener("click", async function () {await copy("https://" + window.location.host + "/Colours/json/" + render_data[i] + ".json")})
        title.appendChild(titleText)

        let content = document.createElement("div")
        content.classList.add = "content";
        container.appendChild(content)

        let colours = document.createElement("div")
        colours.classList.add("colours")
        container.appendChild(colours)

        let colour_spaces = ["--light", "--main", "--dark", "--contrast"]
        for (let k = 0; k < colour_spaces.length; k++) {
            let colour_box = document.createElement("div")
            colour_box.style.backgroundColor = palette_data[colour_spaces[k]]
            colours.appendChild(colour_box)
        }

        parent.appendChild(container)
    }
}

render_palettes().then()
