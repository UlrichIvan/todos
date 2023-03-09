export const getStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}
export const setStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}
export const removeStorage = (key) => {
    return localStorage.removeItem(key)
}