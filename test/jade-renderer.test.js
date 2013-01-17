var assert = require('assert')
  , join = require('path').join
  , fs = require('fs')
  , render = require('..')
  , noop = function () {}

describe('render()', function () {

  before(function (done) {
    fs.unlink(join(__dirname, 'fixtures', 'html', 'index.html'), function () {
      done()
    })
  })

  it('should render a single stylus file', function (done) {
    render([ { template: 'index', data: 'Home' } ],
      { src: join(__dirname, 'fixtures')
      , dest: join(__dirname, 'fixtures', 'html')
      , logger: { debug: noop, info: noop, warn: noop, error: noop }
      }, function (err) {
        assert(!err)
        fs.readFile(join(__dirname, 'fixtures', 'html', 'index.html'), function (err, data) {
          assert(!err)
          assert(data.length > 1)
          done()
        })
      })
  })

  after(function (done) {
    fs.unlink(join(__dirname, 'fixtures', 'html', 'index.html'), done)
  })

})