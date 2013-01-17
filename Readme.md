![Build Status](https://travis-ci.org/bengourley/node-jade-renderer.png?branch=master)


## Install:

```
npm install jade-renderer
```

## Usage:

```js
var render = require('jade-renderer')
```

### render(pages, options, cb)

- `pages` an array of 'pages' to render. 'pages' look like this:
  ```js
  { template: 'path/to/template'
  , data:
    { text: 'some arbitrary data'
    , more: 'to pass to the template'
    , fn: function () {
        return 'may contain any js, including functions'
      }
    }
  }
  ```
- `options` is an options hash
  - `src` the source directory, defaults to PWD
  - `dest` the destination directory, defaults to PWD
  - `logger` a custom logger object, defaults to console.log
- `cb` is the callback `function (err) {}` (`err` is null if ok)

Eg:
```js
render(
    [ { template: 'index', data: { title: 'Index'} }
    , { template: 'about', data: { title: 'About'} }
    ]
  , { src: __dirname
    , dest: __dirname + '/html/'
    }
  , function () {
    console.log('done!')
  })
```