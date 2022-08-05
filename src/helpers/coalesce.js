module.exports = function(a, b = null) {
    return (a === null || a === undefined) ? b : a;
};