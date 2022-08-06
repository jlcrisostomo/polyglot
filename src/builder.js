const util = require("./util");
const sqlsrv_select = require("./driver/sqlsrv/select");

function makeFullTableName(database, schema, table) {
    let str = "";

    if(!util.empty(database)) {
        str += '[' + database + '].';
    }

    if(!util.empty(schema)) {
        str += '[' + schema + '].';
    }

    if(!util.empty(table)) {
        str += '[' + table + ']';
    }

    return str;
}

function builder(context) {
    let driver = context.driver.toLowerCase(),
        database = context.database,
        schema = null,
        table = null;

    util.extend(this, {
        use(a, b = null) {
            if(!util.empty(b))
            {
                table = b;
                schema = a;
            }
            else
            {
                table = a;
            }

            return this;
        },
        getDriver() {
            return driver;
        },
        getDatabase() {
            return database;
        },
        getSchema() {
            return schema;
        },
        getTable() {
            return table;
        },
        select(fetch = null) {
            if(driver === "sqlsrv")
            {
                return new sqlsrv_select(this, makeFullTableName(database, schema, table), fetch);
            }
        }
    });
}

module.exports = builder;