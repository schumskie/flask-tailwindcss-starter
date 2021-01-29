const path = require('path');

const postcssConfig = {
	plugins: [
    require('postcss-import'),
    require('tailwindcss')(path.resolve(__dirname, 'tailwind.config.js')),
    require('autoprefixer')],
};

if (process.env.NODE_ENV === 'production') {
    postcssConfig.plugins.push(
        require('cssnano')
    );
}

module.exports = postcssConfig;
