const util = require("./../../util");
const whereBuilder = require("./../../where");

function fluentlySelect(context, table, param = null) {
    let raw = "SELECT ",
        data = {
            top: -1,
        };

    util.extend(this, {
        top(length = 1) {
            data.top = length;

            return this;
        },
        where() {
            return new whereBuilder(this, context, table);
        },
        toString() {
            if(data.top != -1)
            {
                raw += "TOP " + data.top + " ";
            }

            if(util.empty(param))
            {
                raw += "* ";
            }
            else
            {
                if(Array.isArray(param) && param.length != 0)
                {
                    raw += param.join(", ") + " ";
                }
                else if(typeof param === "object" && !util.isEmptyObject(param))
                {
                    let items = [];

                    Object.keys(param).forEach(function(key) {
                        items.push(table + "." + key + " as " + param[key]);
                    });

                    raw += items.join(", ") + " ";
                }
                else
                {
                    raw += "* ";
                }
            }

            raw += "FROM " + table + " ";

            return raw.trim();
        }
    });
}

module.exports = fluentlySelect;