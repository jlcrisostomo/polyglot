'use strict';

const methods = require('./src/methods');
const util = require('./src/util');

function polyglot(param) {
    let driver = util.coalesce(param.driver, 'sqlsrv'),
        database = util.coalesce(param.database),
        schema = util.coalesce(param.schema),
        tablename = makeTableName(database, schema, util.coalesce(param.tablename));
    
    return new initPolyglot(driver, tablename);
}

function initPolyglot(driver, tablename) {
    this.driver = driver;
    this.tablename = tablename;

    return util.extend(this, methods);
}

/**
 * Construct a new table name with database name and schema name.
 * 
 * @param {string} database 
 * @param {string} schema 
 * @param {string} tablename 
 * @returns 
 */
function makeTableName(database, schema, tablename) {
    let name = '';

    if(database != null)
    {
        name += '[' + database + '].';
    }

    if(schema != null)
    {
        name += '[' + schema + '].';
    }

    if(tablename != null)
    {
        name += '[' + tablename + ']';
    }

    return name.toLowerCase();
}

let db = polyglot({
    driver: 'sqlsrv',
    database: 'PAPSI_DEV',
    schema: 'USERS',
    tablename: 'muser',
});

let query1 = db.select({
    fetch: '*',
}).top();

console.log(query1);