module.exports = function(a, b) {
    let keys = Object.keys(b);

    keys.forEach(function(key) {
        a[key] = b[key];
    });

    return a;
};