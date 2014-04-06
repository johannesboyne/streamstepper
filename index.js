var through = require('through'),
util = require('util'),
events = require('events')

function Streamstepper (streams, endCloseHandler) {
  events.EventEmitter.call(this)
  var that = this
  this.endClose = endCloseHandler || 'close'
  this.streamOut = through(function write (data) { this.emit('data', data) })
  this.streams = streams
  this.position = 0
  this.stepThrough = function () {
    this.streams[this.position].on('data', function (d) {
      that.streamOut.write(d)
      that.emit('data', d)
    }).on(this.endClose, function () {
      that.position++
      if (that.position < that.streams.length) { 
        that.stepThrough()
      } else {
        that.emit('end')
        that.streamOut.end()
      }
  })
  } 
  this.stepThrough()
}
util.inherits(Streamstepper, events.EventEmitter);

module.exports = Streamstepper
