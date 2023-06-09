const mix = require('laravel-mix');

mix.setPublicPath('public');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.browserSync({
    proxy: "http://127.0.0.1:3333/",
    // files: ["app/css/style.css", "app/js/*.js"]
});

module.exports = {
    entry: ["babel-polyfill", "./app/js"]
};