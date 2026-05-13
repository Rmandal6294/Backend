import path from 'path';

//! Returns the last portion of a path (usually the filename)
console.log(path.basename('/foo/bar/baz/asdf/quux.html')); // returns 'quux.html'
//! You can optionally remove the extension by providing a second argument
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html')); // returns 'quux'

//! Returns the directory name portion of a path
console.log(path.dirname('/foo/bar/baz/asdf/quux.html')); // returns '/foo/bar/baz/asdf'
//! Returns the extension of the path (starting from the last . character)
console.log(path.extname('/foo/bar/baz/asdf/quux.html')); // returns '.html'

//! Joins all given path segments together using the platform-specific separator and normalizes the resulting path 
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux.html')); // returns '/foo/bar/baz/asdf/quux.html'
//! Cleans up a path by resolving .. and . segments and removing redundant slashes 
console.log(path.normalize('/foo/bar//baz/asdf/quux.html')); // returns '/foo/bar/baz/asdf/quux.html'

//! Returns an object whose properties represent significant elements of the path (root, dir, base, ext, name)
console.log(path.parse('/foo/bar/baz/asdf/quux.html'));
/*
returns {
    root: '/',
    dir: '/foo/bar/baz/asdf',
    base: 'quux.html',
    ext: '.html',
    name: 'quux'
}
*/

//!Resolves a sequence of paths into an absolute path. It processes from right to left until an absolute path is constructed
console.log(path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')); // returns '/tmp/subfile'