var assert = require('assert')
  , join = require('path').join
  , fs = require('fs')
  , render = require('..')
  , noop = function () {}

describe('render()', function () {

  beforeEach(function (done) {
    fs.unlink(join(__dirname, 'fixtures', 'html', 'index.html'), function () {
      done()
    })
  })

  it('should render a single jade file with default options', function (done) {
    render([ { template: 'index', data: 'Home' } ],
      { src: join(__dirname, 'fixtures')
      , dest: join(__dirname, 'fixtures', 'html')
      }, function (err) {
        assert(!err)
        fs.readFile(join(__dirname, 'fixtures', 'html', 'index.html'), function (err, data) {
          assert(!err)
          assert(data.length > 1)
          // { pretty: true } means newlines should be present
          assert((data + '').indexOf('\n') !== -1)
          done()
        })
      })
  })

  it('should catch a jade render error and callback with it', function (done) {
    render([ { template: 'error', data: 'Home' } ],
      { src: join(__dirname, 'fixtures')
      , dest: join(__dirname, 'fixtures', 'html')
      }, function (err) {
        assert(err)
        done()
      })
  })

  it('should emit log events', function (done) {
    var logs = 0
    render([ { template: 'index', data: 'Home' } ],
      { src: join(__dirname, 'fixtures')
      , dest: join(__dirname, 'fixtures', 'html')
      }, function (err) {
        assert(!err)
        assert(logs > 0)
        done()
      })
    .on('log', function () { logs++ })
  })

  it('should support custom jade options', function (done) {
    render([ { template: 'index', data: 'Home' } ],
      { src: join(__dirname, 'fixtures')
      , dest: join(__dirname, 'fixtures', 'html')
      , jadeOptions: { pretty: false }
      }, function (err) {
        fs.readFile(join(__dirname, 'fixtures', 'html', 'index.html'), function (err, data) {
          assert(!err)
          assert((data + '').indexOf('\n') === -1)
          done()
        })
      })
  })

  afterEach(function (done) {
    fs.unlink(join(__dirname, 'fixtures', 'html', 'index.html'), function () {
      done()
    })
  })

})