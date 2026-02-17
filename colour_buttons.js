import { id } from "./script"

const colour_buttons = ["red", "orange", "yellow", "green", "blue", "pink", "purple", "brown", "black", "white"];

for (let i = 0; i < colour_buttons.length; i++) {
    let button = id(colour_buttons[i])
    button.style.backgroundColor = "color-mix(in srgb, " + colour_buttons[i] + ", white)";
    button.style.border = "solid 2px color-mix(in srgb, " + colour_buttons[i] + ", black)"
    button.addEventListener("click", function() { setColour(colour_buttons[i]) })
}
let button = id("any")
const rainbow_colours = ["red", "orange", "yellow", "green", "blue", "purple", "red"]
let rainbow_string = ""
for (let i = 0; i < rainbow_colours.length; i++) {
    rainbow_string += "color-mix(in srgb, " + rainbow_colours[i] + ", white), ";
}
button.style.backgroundImage = "conic-gradient(" + rainbow_string.slice(0, -2) + ")";
button.style.border = "solid 2px black"
button.addEventListener("click", function() { setColour("any") })
setColour("any")

for (let i = 0; i < 100; i++) {
    id("break").appendChild(document.createElement("br"))
}

let text = document.createElement("p")
text.textContent = "hi"
id("break").appendChild(text)

function setColour(colour) {
    const oldColour = sessionStorage.get("colour")
    if (oldColour) {
        if (oldColour === colour) {
            id(colour).style.cornerShape = "round"
            colour = "any"
        } else {
            id(oldColour).style.cornerShape = "round"
        }
    }
    id(colour).style.cornerShape = "bevel"
    sessionStorage.set("colour", colour)
}