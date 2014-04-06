#Streamstepper

This module is a very simple stream utility. How do you read multiple streams sequentially into one stream? With stream stepper! ;-)

Just have a look at the exmaple:

```
var fs = require('fs'),
Streamstepper = require('./index')

var newStepper = new Streamstepper([
  fs.createReadStream('testfile1.txt'),
  fs.createReadStream('testfile2.txt'),
  fs.createReadStream('testfile3.txt')
])

var count = 0
newStepper.on('data', function (d) {
  count += (d+'').length
})
newStepper.on('end', function () {
  console.log('count: %s', count)
})
```

`npm i streamstepper`
