'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.autoprefixer = {

    setUp: function(done) {
        // setup here if necessary
        done();
    },

    single_file: function(test) {
        var actual = grunt.file.read('tmp/single_file.css');
        var expected = grunt.file.read('test/expected/single_file.css') +
                       '\n/*# sourceMappingURL=single_file.css.map */';
        var sourcemap = grunt.file.read('tmp/single_file.css.map');

        test.strictEqual(actual, expected, 'should prefix single file.');
        test.ok(sourcemap, 'should produce source map.');
        test.done();
    },

    multiple_files: function(test) {
        var actual = grunt.file.read('tmp/multiple_files/cube.css') +
                     grunt.file.read('tmp/multiple_files/gradient.css');
        var expected = grunt.file.read('test/expected/multiple_files/cube.css') +
                       '\n/*# sourceMappingURL=cube.css.map */' +
                       grunt.file.read('test/expected/multiple_files/gradient.css') +
                       '\n/*# sourceMappingURL=gradient.css.map */';
        var sourcemap = grunt.file.read('tmp/multiple_files/cube.css.map') +
                        grunt.file.read('tmp/multiple_files/gradient.css.map');

        test.strictEqual(actual, expected, 'should prefix all files.');
        test.ok(sourcemap, 'should produce source map.');
        test.done();
    },

    concat: function(test) {
        var actual = grunt.file.read('tmp/concat.css');
        var expected = grunt.file.read('test/expected/concat.css') +
                       '\n/*# sourceMappingURL=concat.css.map */';
        var sourcemap = grunt.file.read('tmp/concat.css.map');

        test.strictEqual(actual, expected, 'should concat all files and prefix the one.');
        test.ok(sourcemap, 'should produce source map.');
        test.done();
    },

    single_no_dest: function(test) {
        var actual = grunt.file.read('tmp/no_dest.css');
        var expected = grunt.file.read('test/expected/no_dest.css') +
                       '\n/*# sourceMappingURL=no_dest.css.map */';
        var sourcemap = grunt.file.read('tmp/no_dest.css.map');

        test.strictEqual(actual, expected, 'should prefix a source file if target have no destination specified.');
        test.ok(sourcemap, 'should produce source map.');
        test.done();
    },

    multiple_no_dest: function(test) {
        var actual = grunt.file.read('tmp/multiple_no_dest/cube.css') +
                     grunt.file.read('tmp/multiple_no_dest/gradient.css');
        var expected = grunt.file.read('test/expected/multiple_no_dest/cube.css') +
                       '\n/*# sourceMappingURL=cube.css.map */' +
                       grunt.file.read('test/expected/multiple_no_dest/gradient.css') +
                       '\n/*# sourceMappingURL=gradient.css.map */';
        var sourcemap = grunt.file.read('tmp/multiple_no_dest/cube.css.map') +
                        grunt.file.read('tmp/multiple_no_dest/gradient.css.map');

        test.strictEqual(actual, expected, 'should prefix all source files if target have no destination specified.');
        test.ok(sourcemap, 'should produce source map.');
        test.done();
    },

    single_file_in_sourcemap: function(test) {
        var actual = grunt.file.read('tmp/single_file_in_sourcemap.css');
        var expected = grunt.file.read('test/expected/single_file.css') +
                       '\n/*# sourceMappingURL=single_file_in_sourcemap.css.map */';
        var sourcemap = grunt.file.read('tmp/single_file_in_sourcemap.css.map');

        test.strictEqual(actual, expected, 'should prefix single file with in-sourcemap.');
        test.ok(sourcemap, 'should produce source map.');
        test.done();
    },

};
