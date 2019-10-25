// Get the key from local storage
export function getFromStorage(key) {
    if (!key) {
        return null
    }

    try {
        const valueStr = localStorage.getItem(key)
        if (valueStr) {
            return JSON.parse(valueStr)
        }

        return null
    } catch (err) {
        return null
    }
}

// Store the key into local storage
export function setInStorage(key, obj) {
    if (!key) {
        console.log('Error: Key is missing')
    }

    try {
        localStorage.setItem(key, JSON.stringify(obj))
    } catch (err) {
        console.error(err)
    }
}