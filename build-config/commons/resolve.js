const path = require('path');

module.exports = function exports() {
    return {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            // Use the same react library for any child projects, to prevent duplication errors
            react: path.join(process.cwd(), 'node_modules', 'react')
        },
        extensions: ['*', '.js', '.es6']
    };
};
