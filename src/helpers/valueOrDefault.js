export default function(value, def='--') {
    if (!value) return def

    if (typeof value == 'number') {
        value = value.toLocaleString('en-US')
    }

    if (!Array.isArray(value) && typeof value == 'object') {
        value = Object.values(value)
    }
    
    if (Array.isArray(value)) {
        value = value.join(', ')
    }

    return value ?? def
}