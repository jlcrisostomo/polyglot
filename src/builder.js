const util = require('./util');

function queryBuilder(context, type, param) {
    this.driver = context.driver;
    this.tablename = context.tablename;
    this.data = util.extend({}, param);
}

module.exports = queryBuilder;