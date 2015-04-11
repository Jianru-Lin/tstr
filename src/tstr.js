// template string function
// example:
//     tstr('http://${host}:${port}/index.html', {host: 'www.target.com', port: '8080'})
//     -> http://www.target.com:8080/index.html
function tstr(str, data, option) {

    checkArgs()
    init()
    return level_0(str, data2f(data))

    function checkArgs() {
        if (typeof str !== 'string') {
            throw new Error('[tstr] invalid argument, type of str must be string')
        }
        if (typeof data !== 'object') {
            throw new Error('[tstr] invalid argument, type of data must be object')
        }
        // TODO check option
    }

    function level_0(str, f) {

        var pattern = /\${([^}]+)}/g
        return str.replace(pattern, function(g0, g1, pos, src) {
            var val = f(g1)
            if (val === undefined || val === null) {
                return ''
            }
            else if (typeof val !== 'string') {
                throw new Error('[level_0] type of value returned from f(' + g1 + ') is not string')
            }
            else {
                return val
            }
        })

        function checkArgs() {
            if (typeof str !== 'string') {
                throw new Error('[level_0] invalid argument, type of str must be string')
            }
            if (typeof f !== 'function') {
                throw new Error('[level_0] invalid argument, type of f must be function')
            }
        }
    }

    function data2f(data) {
        if (typeof data !== 'object') {
            throw new Error('[data2f] invalid argument, typeof data must be object')
        }
        return queryValue
        
        function queryValue(expText) {
            filterExp = parseFilterExpression(expText)
            return executeFilterExpression(filterExp)

            function parseFilterExpression(expText) {
                // split by |
                var parts = expText.split('|')
                // clear useless whitespace of every part
                parts = parts.map(function(part) {
                    return part.trim()
                })
                // return result
                if (parts.length > 1) {
                    return {
                        name: parts[0],
                        filterNameList: parts.slice(1)
                    }
                }
                else {
                    return {
                        name: parts[0],
                        filterNameList: []
                    }
                }
            }

            function executeFilterExpression(filterExp) {
                // retrive the raw value
                var rawValue = data[filterExp.name]
                if (rawValue === undefined || rawValue === null) {
                    rawValue = ''
                }
                else if (typeof rawValue !== 'string') {
                    throw new Error('[executeFilterExpression] value returned from data[' + filterExp.name + '] must be string or null or undefined')
                }
                // invoke filter function on rawValue
                var value = rawValue
                filterExp.filterNameList.forEach(function(filterName) {
                    // ignore empty filterName
                    if (!filterName) {
                        return
                    }
                    var filterFun = tstr.filterMap[filterName]
                    if (typeof filterFun !== 'function') {
                        throw new Error('[executeFilterExpression] filter function not found: ' + filterName)
                    }
                    // try invoke the filterFun
                    try {
                        value = filterFun(rawValue)
                        // recheck the value
                        if (typeof value !== 'string') {
                            throw new Error('[executeFilterExpression] filter function returned an value that is not string: ' + value)
                        }
                    }
                    catch (err) {
                        throw new Error('[executeFilterExpression] error throwed from filter function ' + filterName + ', ' + err.toString())
                    }
                })

                // return result
                return value
            }
        }

    }

    function init() {
        if (tstr.inited) {
            return
        }
        tstr.inited = true
        tstr.filterMap = {
            URI: encodeURI,
            URICom: encodeURIComponent
        }
    }
}