const builder = require('./builder');
const selectBuilder = require('./selectBuilder');
const util = require('./util');

function select(param) {
    return util.extend(new builder(this, 'select', param), selectBuilder);
}

function update(param = null) {
    return new builder(this, 'update', param);
}

module.exports = {
    select,
    update,
};