const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const normalize = obj => {
    return Object.keys(obj).map(key => {
        const val = obj[key]
        return key + '=' + val
    }).join('&')
}

const pick = (obj, keys) => {
    return keys.map(key => {
        return [key, obj[key]]
    }).reduce((result, [key, val]) => {
        result[key] = val
        return result
    }, {})
}

const compose = (...fns) => x => fns.reduceRight((x, fn) => fn(x), x)

module.exports = {
    formatTime,
    normalize,
    pick,
    compose
}