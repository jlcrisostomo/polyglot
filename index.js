"use strict";

const version = "1.0.0";
const util = require("./src/util");
const builder = require("./src/builder");

function fluently(config) {
    return new fluentlyContext(config);
}

function fluentlyContext(config) {
    util.defineProp(this, "version", version);
    util.defineProp(this, "driver", util.coalesce(config.driver, "sqlsrv"));
    util.defineProp(this, "database", util.coalesce(config.database, null));
    util.extend(this, new builder(this));
}

const db = fluently({
    driver: "sqlsrv",
    database: "PAPSI_DEV",
});

const sql = db.use('ELECTION', 'mvotes')
                .select()
                .top(1)
                .where()
                .eq('fpk', 10)
                .eq('fstatus', 1)
                .notEq('factive', 0)
                .isNull('fdeleted');

console.log(sql);