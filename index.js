
const path = require("path");
module.exports = (options, context) => ({
    define() {
        return {
            options
        }
    },
    clientRootMixin: path.resolve(__dirname, "clientRootMixin.js")
})