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
        container.style.backgroundColor = palette_data["--contrast"]
        container.className = "palette"

        let title = document.createElement("div")
        title.className = "title"
        title.addEventListener("click", async function () {await copy("https://" + window.location.host + "/Colours/json/" + render_data[i] + ".json")})
        title.style.backgroundImage = palette_data["--image"]
        title.style.backgroundSize = palette_data["--image-size"]
        container.appendChild(title)

        let titleText = document.createElement("h2")
        titleText.textContent = capitalise(render_data[i])
        hover(titleText, palette_data["--contrast"])
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
            colour_box.classList.add("colour_box")
            colour_box.id = render_data[i] + colour_spaces[k]

            let colour_text = document.createElement("h3")
            colour_text.textContent = palette_data[colour_spaces[k]]
            colour_text.id = render_data[i] + colour_spaces[k] + "text"
            if (colour_spaces[k] === "--contrast") {
                colour_text.style.color = palette_data["--alt-text"]
            } else {
                colour_text.style.color = palette_data["--text"]
            }
            colour_text.addEventListener("click", async function () { await copy(palette_data[colour_spaces[k]]) })
            colour_box.appendChild(colour_text)

            colour_box.addEventListener("mouseenter", async function () {
                let other_colours = [...colour_spaces]
                other_colours.splice(other_colours.indexOf(colour_spaces[k]), 1)
                console.log(other_colours)
                for (let j = 0; j < other_colours.length; j++) {
                    id(render_data[i] + other_colours[j]).style.width = "20%"
                }
                colour_box.style.width = "40%"
                colour_text.style.display = "block"
            })
            colour_box.addEventListener("mouseleave", async function () {
                for (let j = 0; j < colour_spaces.length; j++) {
                    id(render_data[i] + colour_spaces[j]).style.width = "25%"
                    id(render_data[i] + colour_spaces[k] + "text").style.display = "none"
                }
            })
        }

        parent.appendChild(container)
    }
}

render_palettes().then()
