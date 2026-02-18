export function id(id) {
    return document.getElementById(id);
}

Storage.prototype.get = function(key) {
    return JSON.parse(this.getItem(key))
}

Storage.prototype.set = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

export function arrayToString(array) {
	let string = ""
	for (let i = 0; i < array.length; i++) {
		string += array[i]
	}
	return string
}

export function capitalise(string, allWords=false) {
	let stringWords
	if (allWords) {
		stringWords = string.split(" ")
	} else {
		stringWords = [string]
	}
	for (let i = 0; i < stringWords.length; i++) {
		stringWords[i] = stringWords[i][0].toUpperCase() + stringWords[i].slice(1)
        if (i < stringWords.length - 1) {
            stringWords[i] += " "
        }
	}
	return arrayToString(stringWords)
}

export async function copy(text) {
    await navigator.clipboard.writeText(text);
}

export function hover(element, colour) {
    const oldColour = element.style.color
    element.addEventListener("mouseenter", function() {element.style.color = colour})
    element.addEventListener("mouseleave", function() {element.style.color = oldColour})
}