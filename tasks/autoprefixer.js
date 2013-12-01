/*
 * grunt-autoprefixer
 *
 * Copyright (c) 2013 Dmitry Nikitenko
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    'use strict';

    var autoprefixer = require('autoprefixer');
    var climap = require("climap");

    grunt.registerMultiTask(
        'autoprefixer',
        'Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use website.',
        function() {
            var options = this.options();

            /**
             * @type {Autoprefixer}
             */
            var compiler = autoprefixer(options.browsers);
            var push = Array.prototype.push;

            var compile = function(input, output) {
                climap(input, output)
                    .parse(function(content, source) {
                        return compiler.parse(content, {source: source});
                    })

                    .reduce(function(concat, current) {
                        push.apply(concat.stylesheet.rules, current.stylesheet.rules);
                        return concat;
                    })

                    .compile(function(ast, data) {
                        var compiled = compiler.compile(ast, {sourcemap: true, filename: data.file});
                        if (options.sourcemap) {
                            compiled.map.sourceRoot = data.sourceRoot;
                            compiled.code += '\n/*# sourceMappingURL=' + data.sourceMappingURL + ' */';
                        }
                        return {content: compiled.code, map: options.sourcemap ? compiled.map : false};
                    })

                    .write(function(compiled, map) {
                        grunt.file.write(output, compiled);
                        if (map) {
                            grunt.file.write(output + '.map', map);
                        }
                        return true;
                    });
            };

            // Iterate over all specified file groups.
            this.files.forEach(function(f) {

                /**
                 * @type {Object[]}
                 */
                var sources = f.src
                    .filter(function(filepath) {
                        // Warn on and remove invalid source files (if nonull was set).
                        if (!grunt.file.exists(filepath)) {
                            grunt.log.warn('Source file "' + filepath + '" not found.');
                            return false;
                        } else {
                            return true;
                        }
                    })
                    .map(function(filepath) {
                        return {source: filepath, content: grunt.file.read(filepath)};
                    });

                // Write the destination file, or source file if destination isn't specified.
                if (typeof f.dest !== 'undefined') {
                    compile(sources, f.dest);
                    grunt.log.writeln('Prefixed file "' + f.dest + '" created.');
                } else {
                    sources.forEach(function(file) {
                        compile(file, file.source);
                        grunt.log.writeln('File "' + file.source + '" prefixed.');
                    });
                }

            });
        }
    );
};
