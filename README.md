## vstr
vstr means Template String. 

## Usage
```javascript
vstr(str, data)
```
### Demo

```javascript
// single variable
vstr("Hello ${name}!", {name: "Alan Turing"})
// result:
// Hello Alan Turing!
```

```javascript
// signle variable with upper filter
vstr("Hello ${name|upper}!", {name: "Alan Turing"})
// result:
// Hello ALAN TURING!
```

```javascript
// signle variable with uri filter
vstr("Hello ${name|uri}!", {name: "Alan Turing"})
// result:
// Hello Alan%20Turing!
```

```javascript
// signle variable with upper and uri filter
vstr("Hello ${name|upper|uri}!", {name: "Alan Turing"})
// result:
// Hello ALAN%20TURING!
```

## Expression Syntax
```javascript
${variable|filter1|filter2|...}
```
