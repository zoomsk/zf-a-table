function type (obj) {
    var toString = Object.prototype.toString
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}
export function deepClone (data) {
    // eslint-disable-next-line one-var
    var t = type(data), o, i, ni

    if (t === 'array') {
        o = []
    } else if (t === 'object') {
        o = {}
    } else {
        return data
    }

    if (t === 'array') {
        for (i = 0, ni = data.length; i < ni; i++) {
            o.push(deepClone(data[i]))
        }
        return o
    } else if (t === 'object') {
        for (i in data) {
            if (data.hasOwnProperty(i)) {
                o[i] = deepClone(data[i])
            }
        }
        return o
    }
}
