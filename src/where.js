const util = require("./util");

function whereBuilder(context, obj, table) {
    let data = [];

    util.extend(this, obj);
    util.extend(this, context);
    util.extend(this, {
        eq: function(key, val, logical = 'AND') {
            data.push({
                key: key,
                value: val,
                operator: '=',
                logical: logical,
            });

            return this;
        },
        notEq: function(key, val, logical = 'AND') {
            data.push({
                key: key,
                value: val,
                operator: '!=',
                logical: logical,
            });

            return this;
        },
        isNull: function(key, logical = 'AND') {
            data.push({
                key: key,
                value: 'NULL',
                operator: '=',
                logical: logical,
            });

            return this;
        },
    });

    delete this.use;
    delete this.select;
    delete this.where;
}

module.exports = whereBuilder;