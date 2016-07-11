
var walk = require('..')
  , path = require('path')
  , assert = require('better-assert')

var fixtures = path.join(__dirname, 'fixtures')

describe('walk', function() {
  describe('walk.walk(dir, iterator, cb)', function () {
    it('should list "dir" and all its descendents', function (done) {
      var dirs = 0
        , files = 0

      function iterator(dir, file, stat, next) {
        assert(dir)
        assert(file)
        assert(stat)

        if (stat.isDirectory()) {
          assert(~[ 'a', 'b', 'c', 'd' ].indexOf(file))
          dirs++
        } else {
          assert('hello' === file)
          files++
        }

        next()
      }

      walk.walk(fixtures, iterator, function (err) {
        if (err) throw err
        // a,b,c,d
        assert(4 === dirs)
        // hello
        assert(1 === files)
        done()
      })
    })
  })
  describe('walk.walkSync(dir, iterator)', function () {
    it('should list "dir" and all its descendents', function () {
      var dirs = 0
        , files = 0

      function iterator(dir, file, stat) {
        assert(dir)
        assert(file)
        assert(stat)

        if (stat.isDirectory()) {
          assert(~[ 'a', 'b', 'c', 'd' ].indexOf(file))
          dirs++
        } else {
          assert('hello' === file)
          files++
        }
      }

      walk.walkSync(fixtures, iterator)
      // a,b,c,d
      assert(4 === dirs)
      // hello
      assert(1 === files)
    })
  })
  describe('walk.files(dir, iterator, cb)', function () {
    it('should list all files in "dir" and its descendents', function (done) {
      var files = 0
      function iterator(dir, file, stat, next) {
        assert(dir)
        assert(stat.isFile())
        assert('hello' === file)
        files++
        next()
      }

      walk.files(fixtures, iterator, function (err) {
        if (err) throw err
        assert(1 === files)
        done()
      })
    })
  })
  describe('walk.filesSync(dir, iterator)', function () {
    it('should list all files in "dir" and its descendents', function () {
      var files = 0

      function iterator(dir, file, stat) {
        assert(dir)
        assert(stat.isFile())
        assert('hello' === file)
        files++
      }

      walk.filesSync(fixtures, iterator)

      assert(1 === files)
    })
  })
  describe('walk.dirs(dir, iterator, cb)', function () {
    it('should list all directories in "dir" and its descendents', function (done) {
      var dirs = 0

      function iterator(dir, file, stat, next) {
        assert(dir)
        assert(file)
        assert(stat)

        assert(stat.isDirectory());
        assert(~[ 'a', 'b', 'c', 'd' ].indexOf(file))
        dirs++

        next()
      }

      walk.dirs(fixtures, iterator, function (err) {
        if (err) throw err
        // a,b,c,d
        assert(4 === dirs)
        done()
      })
    })
  })
  describe('walk.dirsSync(dir, iterator, cb)', function () {
    it('should list all directories in "dir" and its descendents', function () {
      var dirs = 0

      function iterator(dir, file, stat) {
        assert(dir)
        assert(file)
        assert(stat)

        assert(stat.isDirectory());
        assert(~[ 'a', 'b', 'c', 'd' ].indexOf(file))
        dirs++
      }

      walk.dirsSync(fixtures, iterator)
      // a,b,c,d
      assert(4 === dirs)
    })
  })
})
