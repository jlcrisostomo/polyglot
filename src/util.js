"use strict";

function noop() {}

function defineProp(obj, key, val) {
    Object.defineProperty(obj, key, {
        value: val,
        writable: false,
    });

    return obj;
}

function extend(a, b) {
    Object.keys(b).forEach(function(key) {
        a[key] = b[key];
    });

    return a;
}

function isEmptyString(a) {
    return a === "" || a.length === 0;
}

function isEmptyObject(a) {
    return typeof a === "object" && Object.keys(a).length === 0;
}

function isEmptyArray(a) {
    return Array.isArray(a) && a.length === 0;
}

function isNullOrUndefined(a) {
    return a === undefined || a === null;
}

function empty(a) {
    return isNullOrUndefined(a) || isEmptyString(a) || isEmptyArray(a) || isEmptyObject(a);
}

function coalesce(a, b) {
    return isNullOrUndefined(a) ? b : a;
}

module.exports = {
    noop,
    defineProp,
    extend,
    isEmptyString,
    isEmptyObject,
    isEmptyArray,
    isNullOrUndefined,
    empty,
    coalesce,
}