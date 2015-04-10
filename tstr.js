// template string function
// example:
//     tstr('http://${host}:${port}/index.html', {host: 'www.target.com', port: '8080'})
//     -> http://www.target.com:8080/index.html
function tstr(str, data, conv) {

    checkArguments()
    
    var pattern = /\${([a-zA-Z0-9_]+)}/g
    return str.replace(pattern, function(g0, g1, pos, src) {
        if (data[g1] === undefined || data[g1] === null) {
            return ''
        }
        else if (typeof data[g1] !== 'string') {
            throw new Error('[tstr] invalid data, typeof data[' + g1 + '] must be string')
        }
        else {
            return conv(data[g1])
        }
    })

    function checkArguments() {
        if (typeof str !== 'string') {
            throw new Error('[tstr] invalid argument, type of str must be string')
        }
        if (typeof data !== 'object') {
            throw new Error('[tstr] invalid argument, type of data must be object')
        }
        if (conv === null || conv === undefined) {
            conv = function(a) { return a; }
        }
        else if (typeof conv !== 'function') {
            throw new Error('[tstr] invalid argument, type of conv must be function when provided')
        }
    }
}