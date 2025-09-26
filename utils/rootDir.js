const path = require("path");

// Get the directory of the entry file (e.g., app.js)
const rootDir = path.dirname(require.main.filename);

module.exports = rootDir;
