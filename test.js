var fs = require('fs'),
assert = require('assert'),
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
  assert.equal(count, 1367937)
})

