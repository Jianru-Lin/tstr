// template string function
// example:
//     tstr('http://${host}:${port}/index.html', {host: 'www.target.com', port: '8080'})
//     -> http://www.target.com:8080/index.html
function tstr(str, data, option) {

    checkArgs()
    return level_0(str, data2f(data))

    function checkArgs() {
        if (typeof str !== 'string') {
            throw new Error('[tstr] invalid argument, type of str must be string')
        }
        if (typeof data !== 'object') {
            throw new Error('[tstr] invalid argument, type of data must be object')
        }
    }

    function level_0(str, f) {

        var pattern = /\${([a-zA-Z0-9_]+)}/g
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
        return function(name) {
            return data[name]
        }
    }
}