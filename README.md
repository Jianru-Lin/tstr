## tstr
tstr means Template String. 

## Usage
```javascript
tstr(str, data)
```
### Demo

```javascript
// single variable
tstr("Hello ${name}!", {name: "Alan Turing"})
// result:
// Hello Alan Turing!
```

```javascript
// signle variable with upper filter
tstr("Hello ${name|upper}!", {name: "Alan Turing"})
// result:
// Hello ALAN TURING!
```

```javascript
// signle variable with uri filter
tstr("Hello ${name|uri}!", {name: "Alan Turing"})
// result:
// Hello Alan%20Turing!
```

```javascript
// signle variable with upper and uri filter
tstr("Hello ${name|upper|uri}!", {name: "Alan Turing"})
// result:
// Hello ALAN%20TURING!
```

## Expression Syntax
```javascript
${variable|filter1|filter2|...}
```
