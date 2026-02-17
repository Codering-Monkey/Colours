export function id(id) {
    return document.getElementById(id);
}

Storage.prototype.get = function(key) {
    return JSON.parse(this.getItem(key))
}

Storage.prototype.set = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}