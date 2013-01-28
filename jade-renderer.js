module.exports = render

var async = require('async')
  , jade = require('jade')
  , join = require('path').join
  , fs = require('fs')
  , Emitter = require('events').EventEmitter
  , defaults = { jadeOptions: { pretty: true } }

function render(pages, options, cb) {

  var emitter = new Emitter()

  // Extend defaults with user options
  options.__proto__ = defaults

  process.nextTick(function () {

    async.forEach(pages, function (p, callback) {
      var src = join(options.src, p.template + '.jade')
        , dest = join(options.dest, p.template + '.html')

      fs.readFile(src, 'utf8', function (err, data) {
        emitter.emit('log', 'Reading ' + src, 'debug')
        if (err) return callback(err)
        try {
          emitter.emit('log', 'Compiling ' + src, 'debug')
          var jadeOptions = options.jadeOptions
          jadeOptions.filename = src
          var template = jade.compile(data, jadeOptions)

          fs.writeFile(dest, template(p.data), function (err) {
            emitter.emit('log', 'Writing ' + src, 'debug')
            if (!err) {
              emitter.emit('log'
                , 'Rendered ' + p.template + '.jade → ' + p.template + '.html'
                , 'info')
            }
            callback(err)
          })
        } catch (e) {
          callback(e)
        }

      })

    }, cb)

  })

  return emitter

}