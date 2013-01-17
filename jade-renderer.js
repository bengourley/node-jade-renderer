module.exports = render

var async = require('async')
  , jade = require('jade')
  , join = require('path').join
  , fs = require('fs')
  , defaultLogger =
      { debug: console.log
      , info: console.log
      , warn: console.log
      , error: console.log
      }

function render(pages, options, cb) {

  var logger = options.logger || defaultLogger

  async.forEach(pages, function (p, callback) {
    var src = join(options.src, p.template + '.jade')
      , dest = join(options.dest, p.template + '.html')

    fs.readFile(src, 'utf8', function (err, data) {
      if (err) return callback(err)
      var template = jade.compile(data,
        { filename: src
        , pretty: true
        })

      fs.writeFile(dest, template(p.data), function (err) {
        if (!err) {
          logger.debug('Rendered ' + p.template + '.jade → ' + p.template + '.html')
        }
        callback(err)
      })

    })

  }, cb)

}